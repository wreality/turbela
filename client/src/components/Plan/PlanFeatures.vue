<template>
  <div class="col-12">
    <SearchBar v-model="search"></SearchBar>
  </div>
  <div
    v-for="result in searchResults"
    :key="result.item.id"
    class="col-md-3 col-xs-12"
  >
    <FeatureCard
      :feature="result.item"
      :matches="result?.matches ?? null"
      :attached="result.item.attached"
      @update-param="updateParam"
      @detach="detach"
    ></FeatureCard>
  </div>
  <div class="col-md-3 col-xs-12">
    <NewPlanFeature @create="create"></NewPlanFeature>
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { useFuse } from '@vueuse/integrations/useFuse'
import { useQuasar } from 'quasar'
import type {
  CreateFeatureMutationVariables,
  Feature,
} from 'src/generated/graphql'
import {
  AttachFeatureDocument,
  CreateFeatureDocument,
  DetachFeatureDocument,
  GetFeaturesDocument,
  UpdateFeatureParamDocument,
} from 'src/generated/graphql'
import { computed, ref } from 'vue'
import SearchBar from '../SearchBar.vue'
import FeatureCard from './FeatureCard.vue'
import NewPlanFeature from './NewPlanFeature.vue'

type withAttached = {
  attached: boolean
}
type FeatureWithAttached = Feature & withAttached

interface Props {
  features?: Array<Feature>
  planId: string
}

const props = withDefaults(defineProps<Props>(), {
  features: () => [],
})

const { mutate: detachFeature } = useMutation(DetachFeatureDocument)
const { dialog } = useQuasar()
function detach(id: string) {
  dialog({
    title: 'Confirm Removal',
    message:
      'Are you sure you want to remove this feature from this plan?  The feature will not be deleted and can be attached again later.',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    detachFeature({ plan_id: props.planId, feature_id: id })
  })
}

const { mutate: updateFeature } = useMutation(UpdateFeatureParamDocument)
const { mutate: attachFeature } = useMutation(AttachFeatureDocument)
function updateParam(feature: Pick<Feature, 'id'>, newValue: string | number) {
  const attached =
    combinedFeatures.value.find((f) => f.id === feature.id)?.attached ?? false
  const fn = attached ? updateFeature : attachFeature
  fn({
    planId: props.planId,
    featureId: feature.id,
    amount: typeof newValue === 'string' ? parseInt(newValue) : newValue,
  })
}

//CreateFeature
const { mutate: createFeature } = useMutation(CreateFeatureDocument, {
  refetchQueries: ['GetFeatures'],
})
function create(form: CreateFeatureMutationVariables) {
  createFeature(form)
}

//Features
const { result: featuresResult } = useQuery(GetFeaturesDocument)
const allFeatures = computed(() => {
  return featuresResult.value?.getFeatures ?? []
})
const featureIds = computed(() => {
  return props.features.map((f) => f.id)
})
const combinedFeatures = computed((): Array<FeatureWithAttached> => {
  return [
    ...(<Array<FeatureWithAttached>>(
      props.features.map((o) => ({ ...o, attached: true }))
    )),
    ...(<Array<FeatureWithAttached>>(
      allFeatures.value
        .filter((i) => !featureIds.value.includes(i.id))
        .map((o) => ({ ...o, attached: false }))
    )),
  ]
})

//Search

const search = ref('')
const { results: searchResults } = useFuse(search, combinedFeatures, {
  fuseOptions: {
    keys: ['name'],
    shouldSort: false,
    includeMatches: true,
    threshold: 0,
    ignoreLocation: true,
  },
  matchAllWhenSearchEmpty: true,
})
</script>

<script lang="ts">
import { gql } from 'graphql-tag'

gql`
  query GetFeatures {
    getFeatures {
      id
      type
      name
    }
  }
`

gql`
  mutation AttachFeature($planId: ID!, $featureId: ID!, $amount: Int) {
    updatePlan(
      input: {
        id: $planId
        features: { connect: [{ id: $featureId, amount: $amount }] }
      }
    ) {
      id
      features {
        id
        type
        name
        parameters {
          amount
        }
      }
    }
  }
`
gql`
  mutation UpdateFeatureParam($planId: ID!, $featureId: ID!, $amount: Int!) {
    updatePlan(
      input: {
        id: $planId
        features: {
          syncWithoutDetaching: [{ id: $featureId, amount: $amount }]
        }
      }
    ) {
      id
      features {
        id
        type
        name
        parameters {
          amount
        }
      }
    }
  }
`

gql`
  mutation DetachFeature($plan_id: ID!, $feature_id: ID!) {
    updatePlan(
      input: { id: $plan_id, features: { disconnect: [$feature_id] } }
    ) {
      id
      features {
        id
        type
        name
        parameters {
          amount
        }
      }
    }
  }
`

gql`
  mutation CreateFeature($name: String!, $type: FeatureType) {
    createFeature(input: { name: $name, type: $type }) {
      id
      name
      type
    }
  }
`
</script>
