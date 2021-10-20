<template>
  <div class="q-pa-md">
    <q-grid title="搜索引擎排序" :data="engines" :columns="columns" :draggable="true" :pagination="pagination">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td style="width: 50px">
            <q-tooltip anchor="top middle" transition-show="scale" transition-hide="scale"> 拖动行排序，别忘了保存哦。 </q-tooltip>
            <q-btn flat round color="secondary" icon="open_with" size="sm" :data-id="props.row.id"></q-btn>
          </q-td>
          <q-td key="group">
            {{ props.row.group }}
          </q-td>
          <q-td key="name">
            {{ props.row.name }}
          </q-td>
          <q-td key="url">
            {{ props.row.url }}
          </q-td>
          <q-td key="enable" style="width: 100px">
            <q-btn flat round :color="props.row.enable ? 'secondary' : 'blue-grey-12'" :icon="props.row.enable ? 'check_circle_outline' : 'highlight_off'" />
          </q-td>
          <q-td key="isnew" style="width: 100px">
            <q-btn flat round :color="props.row.isnew ? 'secondary' : 'blue-grey-12'" :icon="props.row.isnew ? 'check_circle_outline' : 'highlight_off'" />
          </q-td>
          <q-td key="encode" style="width: 100px">
            <q-btn flat round :color="props.row.encode ? 'secondary' : 'blue-grey-12'" :icon="props.row.encode ? 'check_circle_outline' : 'highlight_off'" />
          </q-td>
        </q-tr>
      </template>
    </q-grid>
    <q-footer bordered class="bg-white q-pa-md row justify-end">
      <q-btn class="row justify-center" color="primary" label="保存排序" @click="save" />
    </q-footer>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useQuasar } from "quasar";
import { getStorageSync, setStorageSync } from "src/utils/index.js";

const columns = [
  { name: "id", label: "", field: "id" },
  { name: "group", align: "left", label: "分组名称", field: "group" },
  { name: "name", align: "left", label: "名称", field: "name" },
  { name: "url", align: "left", label: "URL", field: "url" },
  { name: "enable", align: "left", label: "是否启用", field: "enable" },
  { name: "isnew", align: "left", label: "新页面打开", field: "isnew" },
  { name: "encode", align: "left", label: "是否编码", field: "encode" },
];

const pagination = reactive({ page: 1, rowsPerPage: 999 });

export default {
  async setup() {
    const $q = useQuasar();
    let options = await getStorageSync();

    let engines = [...options.engines];

    return {
      columns,
      engines,
      pagination,
      save() {
        $q.notify({
          message: "保存成功",
          icon: "cloud_done",
          color: "secondary",
        });

        // q-Grid bug 排序后的 data 错误，暂直接解析 DOM 解决
        const btns = document.querySelectorAll("button[data-id]");
        options.engines.length = 0;
        btns.forEach((node) => {
          options.engines.push(engines.find((n) => n.id === node.getAttribute("data-id")));
        });

        setStorageSync(options);
      },
    };
  },
};
</script>

<style>
/* q-grid  hide-bottom hide-pagination 无效，只能用过 Css 处理 */
.q-table__bottom.row.items-center.justify-end {
  display: none;
}
</style>
