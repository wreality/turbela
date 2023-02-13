<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Mustache_Engine as Mustache;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\File;

class Overlay extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    use Searchable;

    protected $fillable = [
        'name', 'spec', 'type',
    ];

    /**
     * Register media collections
     *
     * @return void
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('background')
        ->acceptsFile(function (File $file) {
            return $file->mimeType === 'image/png';
        })
        ->singleFile();
    }

    /**
     * Serialize for search function
     *
     * @return array
     */
    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
        ];
    }

    /**
     * Return the background media object as an attribute
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function background(): Attribute
    {
        return new Attribute(
            get: fn() => $this->getFirstMedia('background')
        );
    }

    /**
     * Make a composite image from a overlay id and data.
     *
     * @param string $id Overlay id
     * @param mixed $data
     * @return string Image data
     */
    public static function make($id, $data)
    {
        $overlay = self::find($id);

        return $overlay->generate($data);
    }

    /**
     * Resolve the spec file names and templates into a final spec.
     *
     * @param bool $public
     * @param mixed $data Data to pass to render functions
     * @return string JSON string
     */
    public function resolveSpec($public = true, $data = null)
    {
        $spec = json_decode($this->spec);
        $m = new Mustache(['entity_flags' => ENT_QUOTES]);

        $spec->backgroundImage->src = $public
            ? $this->getFirstMediaUrl('background')
            : 'file:' . $this->getFirstMediaPath('background');
        if (!empty($data)) {
            foreach ($spec->objects as $object) {
                if ($object->turbelaType === 'AvatarImage') {
                    $object->src = 'file:' . $data->getFirstMediaPath('avatar');
                } elseif ($object->turbelaType === 'Text') {
                    $object->text = $m->render($object->text, $data);
                }
            }
        }

        return json_encode($spec);
    }

    /**
     * Generate a composited image.
     *
     * @param mixed $data The data object to pass to the mustache render engine.
     * @return string Binary png data
     */
    public function generate($data)
    {
        $spec = $this->resolveSpec(false, $data);
        $output = '';
        $descriptorSpec = [
            0 => ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w'],
        ];
        $process = proc_open('/usr/bin/node ' . base_path('/node/overlay.js'), $descriptorSpec, $pipes);
        if (is_resource($process)) {
            fwrite($pipes[0], $spec);
            fclose($pipes[0]);
            while (!feof($pipes[1])) {
                $output .= fgets($pipes[1]);
            }
            while (!feof($pipes[2])) {
                echo fgets($pipes[2]);
            }
        }
        proc_close($process);

        return $output ?? null;
    }
}
