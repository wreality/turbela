<template lang="pug">
q-form(v-if='badge', @submit.prevent='onSave')
  VQWrap(@vqupdate='updateField', tPrefix='badges', :formState='formState')
    VQInput(:v='$v.name', v-bind='$ta("name")')
  FormActions(
    :formState='formState',
    @saveClick='onSave',
    @resetClick='discard(badge)'
  )
q-btn(label='Discard Changes', v-if='$v.$dirty', @click='discard(badge)')
</template>

<fluent locale="en">
name=
  .label=Badge Name
  .placeholder="Badge Name"
name-error-required="Badge Name is a required field."
</fluent>

<script setup lang="ts">
import VQInput from 'src/components/atoms/VQInput.vue'
import VQWrap from 'src/components/atoms/VQWrap.vue'
import FormActions from 'src/components/molecules/FormActions.vue'
import { reactive, watch, onMounted } from 'vue'
import { pick } from 'lodash'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { useFormState } from 'src/composables/forms'
import { useBreadcrumbTags } from 'src/composables/breadcrumbs'
import type { Ref } from 'vue'
import type { Badge } from 'src/generated/graphql'
import type { Validation } from '@vuelidate/core'
import { GetBadgeDocument, UpdateBadgeDocument } from 'src/generated/graphql'

interface Props {
  id: Badge['id']
}

const props = defineProps<Props>()

//Query
const badgeQuery = useQuery(GetBadgeDocument, { id: props.id })
const badge = useResult(badgeQuery.result, {}, (data) => data.badge)
const { form, $v, discard } = useValidation(badge)

function updateField(v: Validation<any, any>, newValue: any) {
  v.$model = newValue
}

const { setTag } = useBreadcrumbTags()
setTag(
  '#badge_name',
  useResult(badgeQuery.result, '', (data) => data.badge.name)
)

//Mutation
const badgeMutation = useMutation(UpdateBadgeDocument)
const { mutate: saveBadge } = badgeMutation
const { formState } = useFormState({
  validator: $v,
  query: badgeQuery,
  mutation: badgeMutation,
})

function onSave() {
  if (!$v.value.$error) {
    saveBadge({ id: props.id, ...form })
  }
}

function useValidation(badge: Ref<Partial<Badge>>) {
  const rules = {
    name: {
      required,
      minLength: minLength(1),
    },
  }
  const form = reactive<Pick<Badge, 'name'>>({ name: '' })
  const $v = useVuelidate(rules, form)

  function discard(newValue: Partial<Badge>) {
    Object.assign(form, pick(newValue, ['name']))
    $v.value.$reset()
  }

  watch(badge, discard)

  onMounted(() => {
    discard(badge.value)
  })

  return { form, $v, discard }
}
const resetData = () => {
  return {
    form: {
      id: null,
      name: '',
      badge_image: null,
      badge_path: '',
      badge: null,
    },
  }
}

// validations: {
//     form: {
//
//       badge: {
//         required: requiredIf(function () {
//           return !this.badge.badge_path
//         }),
//         size: (value) => {
//           if (!value) {
//             return true
//           }
//           if (value instanceof File) {
//             const reader = new FileReader()
//             return new Promise((resolve) => {
//               reader.onload = () => {
//                 var img = new Image()
//                 img.src = reader.result
//                 resolve(
//                   img.width >= 200 &&
//                     img.height >= 200 &&
//                     img.width == img.height
//                 )
//               }
//               reader.onerror = () => {
//                 resolve(false)
//               }
//               reader.readAsDataURL(value)
//             })
//           }
//           return true
//         },
//       },
//     },

// export default {
//   name: 'BadgeEditForm',
//   props: {
//     badge: {
//       type: Object,
//       default: () => {},
//     },
//   },
//   data: resetData,
//   asyncComputed: {
//     badgePreview() {
//       return new Promise((resolve) => {
//         if (!this.$v.form.badge.$model) {
//           if (this.badge.badge_path) {
//             resolve(this.badge.badge_path)
//           } else {
//             resolve('')
//           }
//         }
//         const reader = new FileReader()
//         reader.onload = () => {
//           resolve(reader.result)
//         }
//         reader.onerror = () => {
//           resolve('')
//         }
//         reader.readAsDataURL(this.$v.form.badge.$model)
//       })
//     },
//   },
//   watch: {
//     badge() {
//       this.assignForm(this.badge)
//     },
//   },
//   mounted() {
//     this.assignForm(this.badge)
//   },
//   methods: {
//     badgeDesignerImage(image) {
//       this.$v.form.badge.$model = image
//       this.$bvModal.hide('badgeDesigner')
//     },
//     deleteBadge() {
//       this.$bvModal
//         .msgBoxConfirm(
//           'Are you sure you want to delete this badge?  This will delete all recorded completions for this badge as well and cannot be undone.',
//           {
//             title: 'Please Confirm',
//             size: 'sm',
//             buttonSize: 'sm',
//             okVariant: 'danger',
//             okTitle: 'YES',
//             cancelTitle: 'NO',
//             footerClass: 'p-2',
//             hideHeaderClose: false,
//             centered: true,
//           }
//         )
//         .then((value) => {
//           if (value) {
//             this.$emit('delete', this.badge.id)
//           }
//         })
//     },
//     onCancel() {
//       if (this.$v.$anyDirty) {
//         this.assignForm(this.badge)
//       } else {
//         this.$emit('cancel')
//       }
//     },
//     afterAssignForm() {
//       this.form.badge = null
//     },
//   },
//   pickFields: ['id', 'name', 'badge'],

//   },
// }
</script>
