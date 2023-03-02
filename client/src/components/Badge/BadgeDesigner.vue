<template>
  <b-modal
    id="badgeDesigner"
    size="lg"
    centered
    ok-disabled
    footer-bg-variant="secondary"
    title="Badge Designer"
  >
    <template #modal-footer>
      <div class="float-right">
        <b-button
          variant="light"
          size="sm"
          @click="$bvModal.hide('badgeDesigner')"
        >
          Cancel
        </b-button>
        <b-button variant="primary" size="sm" @click="saveImage">
          Save</b-button
        >
      </div>
    </template>
    <div>
      <b-row>
        <b-col>
          <v-stage ref="stage" class="m-auto" :config="configKonva">
            <v-layer>
              <v-circle ref="circle" :config="configCircle"></v-circle>
              <v-text-path :config="configTextpath"></v-text-path>
              <v-path
                :config="{
                  x: iconPos,
                  y: 35,
                  data: icon.icon[4],
                  fill: iconFill,
                  scale: { x: 0.15, y: 0.15 },
                  draggable: true,
                }"
              />
            </v-layer>
            <v-layer>
              <v-rect :config="configRect" />
              <v-text :config="configText" />
            </v-layer>
          </v-stage>
        </b-col>
        <b-col>
          <h5>Colors</h5>
          <b-row>
            <b-col auto>
              <ul class="nav">
                <li
                  v-for="color in ['badge', 'outerText', 'icon']"
                  :key="color"
                >
                  <b-button
                    variant="outline-secondary"
                    :active="colorPicker == color"
                    @click.prevent="colorPicker = color"
                    >{{ color }}</b-button
                  >
                </li>
              </ul>
            </b-col>
            <b-col>
              <chrome-picker
                v-if="colorPicker == 'badge'"
                :value="configCircle.fill"
                @input="updateColor('badge', $event)"
              />
              <chrome-picker
                v-if="colorPicker == 'outerText'"
                :value="configTextpath.fill"
                @input="updateColor('outerText', $event)"
              /><chrome-picker
                v-if="colorPicker == 'icon'"
                :value="iconFill"
                @input="updateColor('icon', $event)"
              />
            </b-col>
          </b-row>
          <b-form-group label="Badge Text">
            <b-input v-model="configText.text"></b-input>
          </b-form-group>
          <b-form-group label="Outer Text">
            <b-input v-model="configTextpath.text" />
          </b-form-group>
          <b-form-group label="Icon">
            <b-form-select v-model="iconName" :options="$options.icons" />
          </b-form-group>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
import { Chrome as ChromePicker } from 'vue-color'
import {
  faGraduationCap,
  faCheck,
  faEye,
} from '@fortawesome/free-solid-svg-icons'

import Konva from 'konva'

export default {
  name: 'BadgeDesigner',
  components: {
    ChromePicker,
  },
  emits: ['image'],
  data() {
    return {
      colorPicker: 'badge',
      iconName: 'faGraduationCap',
      iconFill: '#ffffff',
      configKonva: {
        width: 200,
        height: 200,
      },
      configCircle: {
        x: 100,
        y: 100,
        embossStrength: 0.9,
        embossBlend: true,
        embossWhiteLevel: 0.8,
        radius: 85,
        fill: '#0000FF',
        strokeWidth: 0,
        shadowBlur: 10,
        shadowOffset: { x: 5, y: 5 },
        shadowOpacity: 0.5,
        filters: [Konva.Filters.Emboss],
      },
      configRect: {
        width: 196,
        height: 22,
        x: 2,
        y: 105,
        fill: '#FFFFFF',
        stroke: 'black',
        strokeWidth: 2,
      },
      configText: {
        x: 2,
        y: 106,
        fill: '#000000',
        width: 196,
        align: 'center',
        fontFamily: 'Calibri',
        fontStyle: 'bold',
        fontVariant: 'small-caps',
        fontSize: 23,
        text: 'Badge Text',
      },
      configTextpath: {
        x: 0,
        y: 30,
        fill: 'yellow',
        fontSize: 24,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontVariant: 'small-caps',
        align: 'center',
        text: 'OUTER TEXT ',
        data: 'M0,-10 C10,190 190,190 200,-10',
      },
      circleColor: '#FFFFFF',
    }
  },
  icons: [
    { value: 'faGraduationCap', text: 'Graduation Cap' },
    { value: 'faCheck', text: 'Check Mark' },
    { value: 'faEye', text: 'Eye' },
  ],
  computed: {
    iconPos() {
      return 10
    },
    icon() {
      let icon = faCheck
      /* eslint-disable vue/script-indent */
      switch (this.iconName) {
        case 'faGraduationCap':
          icon = faGraduationCap
          break
        case 'faCheck':
          icon = faCheck
          break
        case 'faEye':
          icon = faEye
          break
      }
      /* eslint-enable vue/script-indent */
      return icon
    },
  },
  updated() {
    this.$refs.circle.getStage().cache()
  },
  methods: {
    updateColor(c, color) {
      if (c == 'badge') {
        this.configCircle.fill = color.hex
      } else if (c == 'outerText') {
        this.configTextpath.fill = color.hex
      } else if (c == 'icon') {
        this.iconFill = color.hex
      }
    },
    saveImage() {
      this.$refs.stage
        .getStage()
        .toCanvas()
        .toBlob((blob) => {
          this.$emit('image', blob)
        }, 'image/png')
    },
  },
}
</script>

<style lang="scss">
#badgeDesigner {
  .konvajs-content {
    margin: auto;
  }
  ul.nav li {
    margin-bottom: 1em;
  }
}
</style>
