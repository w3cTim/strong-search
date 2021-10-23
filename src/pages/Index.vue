<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-checkbox v-model="options.triggerkey" label="需要同时按下 Ctrl 键触发" />
    </div>
    <q-separator class="q-my-lg" />
    <q-table :rows="options.engines" :filter="filter" row-key="id" :columns="columns" :loading="loading" title="引擎管理" v-model:pagination="pagination" hide-pagination>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="搜索">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="group">
            {{ props.row.group }}
            <q-popup-edit v-model="props.row.group" title="编辑分组" buttons label-set="确认" label-cancel="取消" v-slot="scope">
              <q-input v-model="scope.value" hint="菜单分组名称" @keyup.enter="scope.set" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="name">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" title="编辑名称" buttons label-set="确认" label-cancel="取消" :validate="nameValidation" @hide="nameValidation" v-slot="scope">
              <q-input v-model="scope.value" hint="请填写名称" :error="errorState" :error-message="errorMessage" @keyup.enter="scope.set" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="url">
            {{ props.row.url }}
            <q-popup-edit v-model="props.row.url" title="编辑 URL" buttons label-set="确认" label-cancel="取消" :validate="urlValidation" @hide="urlValidation" v-slot="scope">
              <q-input v-model="scope.value" hint="使用变量 %s 代替关键词" :error="errorState" :error-message="errorMessage" @keyup.enter="scope.set" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="enable" style="width: 100px">
            <q-toggle v-model="props.row.enable" checked-icon="check_circle_outline" unchecked-icon="highlight_off" color="secondary" />
          </q-td>
          <q-td key="isnew" style="width: 100px">
            <q-toggle v-model="props.row.isnew" checked-icon="tab" unchecked-icon="tab_unselected" color="secondary" />
          </q-td>
          <q-td key="encode" style="width: 100px">
            <q-tooltip anchor="top middle" transition-show="scale" transition-hide="scale"> 如果遇到搜索引擎字符乱码，请选中"编码"选项。 </q-tooltip>
            <q-toggle v-model="props.row.encode" checked-icon="code" unchecked-icon="code_off" color="secondary"> </q-toggle>
          </q-td>
          <q-td key="id" style="width: 100px">
            <q-btn flat round color="accent" icon="delete_forever" @click="removeRow(props.row.id)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="row justify-center">
      <q-btn class="q-mt-md" color="secondary" label="添加引擎" @click="addRow" />
    </div>
    <!-- <q-separator class="q-my-lg" /> -->
    <q-dialog v-model="inprotDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">请选择配置文件</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-file color="grey-3" label="选择文件" outlined v-model="inportFile" accept=".json" @input="inprotButtom = false">
            <template v-slot:append>
              <q-icon name="attachment" />
            </template>
          </q-file>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="确认导入" @click="submitInport" :disable="inprotButtom" v-close-popup />
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-footer bordered class="bg-white q-pa-md row justify-end">
      <q-btn color="primary" label="保  存" @click="save" />
      <q-btn class="q-ml-md" color="accent" label="还原默认" @click="reset" />
      <q-btn class="q-ml-md" color="secondary" label="导出配置" @click="exportConfig" />
      <q-btn class="q-ml-md" color="secondary" label="导入配置" @click="inprotDialog = true" />
    </q-footer>
  </div>
</template>

<script>
import { ref, reactive, toRaw, nextTick } from "vue";
import { useQuasar, uid } from "quasar";

import { setStorageSync, getStorageSync, resetStorageSync, downloadJson, parseJsonFile } from "src/utils/index.js";

const columns = [
  { name: "group", align: "left", label: "分组名称", field: "group" },
  { name: "name", align: "left", label: "名称", field: "name" },
  { name: "url", align: "left", label: "URL", field: "url" },
  { name: "enable", align: "left", label: "是否启用", field: "enable" },
  { name: "isnew", align: "left", label: "新页面打开", field: "isnew" },
  { name: "encode", align: "left", label: "是否编码", field: "encode" },
  { name: "c", label: "操作", field: "id", align: "left" },
];

export default {
  async setup() {
    const $q = useQuasar();
    const pagination = ref({ page: 1, rowsPerPage: 999 });
    const loading = ref(false);

    const errorState = ref(false);
    const errorMessage = ref("");

    const inprotDialog = ref(false);
    const inprotButtom = ref(true);
    const inportFile = ref(null);

    let data = await getStorageSync();

    let options = reactive(data);

    return {
      pagination,
      loading,
      columns,
      options,
      filter: ref(""),

      errorState,
      errorMessage,

      inprotDialog,
      inportFile,
      inprotButtom,

      addRow() {
        const newRow = { id: "", group: "常用", name: "Name", url: "https://www.google.com/search?q=%s", encode: false, isnew: true, enable: true };
        newRow.id = uid();
        options.engines.push(newRow);

        nextTick(() => {
          scrollTo(0, document.documentElement.scrollTop + 60);
        });
      },
      removeRow(id) {
        const index = options.engines.findIndex((n) => n.id === id);
        options.engines.splice(index, 1);
      },
      save() {
        $q.notify({
          message: "保存成功",
          icon: "cloud_done",
          color: "secondary",
        });
        setStorageSync(toRaw(options));
      },
      reset() {
        $q.dialog({
          title: "提示",
          icon: "network_wifi",
          message: "确认还原默认配置？",
          cancel: true,
          ok: "确认",
          cancel: "取消",
        }).onOk(async () => {
          const reset = await resetStorageSync();
          Object.assign(options, reset);
        });
      },
      exportConfig() {
        downloadJson(JSON.stringify(options), "强悍搜索配置.json");
      },
      async submitInport() {
        const showMessage = (msg) => {
          $q.notify({
            type: "warning",
            message: msg,
            timeout: 4000,
          });
        };

        let inportJSON = null;
        try {
          inportJSON = await parseJsonFile(inportFile.value);
        } catch (error) {
          $q.notify({
            type: "negative",
            message: "导入文件数据格式错误，请检查导入文件。",
            timeout: 4000,
          });
          return;
        }

        inportFile.value = null;

        if (inportJSON === null) {
          showMessage("请导入正确的数据。");
          return;
        }
        const keyCloumn = ["triggerkey", "engines"];
        const inportKey = Object.keys(inportJSON);

        if (inportKey.length === 0) {
          showMessage("请导入正确的数据。");
          return;
        }

        while (keyCloumn.length) {
          let key = keyCloumn.shift();
          if (!inportKey.includes(key)) {
            showMessage(`文件缺少关键字：${key} ,请检查导入文件。`);
            return;
          }
        }
        const engines = inportJSON["engines"];
        if (engines === null || !Array.isArray(engines) || engines.length === 0) {
          showMessage("导入数据行不能为空，请检查导入文件。");
          return;
        }

        Object.assign(options, inportJSON);

        $q.notify({
          message: "成功导入数据~",
          icon: "cloud_done",
          color: "secondary",
        });

        setStorageSync(toRaw(options));
      },
      nameValidation(val) {
        if (val !== undefined && val.length === 0) {
          errorState.value = true;
          errorMessage.value = "请填写名称";
          return false;
        }
        errorState.value = false;
        errorMessage.value = "";
        return true;
      },
      urlValidation(val) {
        if (val === undefined) {
          errorState.value = false;
          errorMessage.value = "";
          return true;
        }
        const reg = /^(http(s)?:\/\/)\w+[^\s]+(\.[^\s]+){1,}$/;
        if (val.length === 0 || !reg.test(val)) {
          errorState.value = true;
          errorMessage.value = "请填写正确的URL";
          return false;
        }
      },
    };
  },
};
</script>
