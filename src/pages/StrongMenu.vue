<template>
  <div>阿萨德飞飞付付付发奥</div>
</template>

<script>
import { defineComponent, onBeforeUnmount } from "vue";
import { useQuasar, copyToClipboard } from "quasar";

export default defineComponent({
  name: "StrongMenu",
  setup() {
    const $q = useQuasar();

    // Our function which receives the URL sent by the background script.
    function textcopyToClipboard(request) {
      console.log("New Browser Tab Openend: ", request);
      copyToClipboard("New Browser Tab Openend")
        .then(() => {
          // success!
          console.log("sucess");
        })
        .catch((e) => {
          // fail
          console.log("fail" + e);
        });
    }

    // Add our listener
    $q.bex.on("bex.strongsearch.copytext", textcopyToClipboard);

    // Don't forget to clean it up
    onBeforeUnmount(() => {
      $q.bex.off("bex.strongsearch.copytext", textcopyToClipboard);
    });
  },
});
</script>
