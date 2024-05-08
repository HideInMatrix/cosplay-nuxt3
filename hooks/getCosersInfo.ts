import type { Tag } from "~/types/tag";

export let coseInfo = ref<Tag>();
export async function getCoserInfo(_tagId: string) {
  let { data: resp } = await $fetch("/api/cosers/coser", {
    params: {
      tagId: _tagId,
    },
  });
  if (resp) {
    coseInfo.value = resp;
  }
}
