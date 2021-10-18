<template>
  <div class="q-pa-md">
    <q-table :rows="rows" row-key="name" :columns="columns" :loading="loading" title="引擎管理" v-model:pagination="pagination" hide-pagination>
      <template v-slot:buttom>
        <q-btn color="primary" :disable="loading" label="Add row" @click="addRow" />
        <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" style="width: 100px"> {{ props.row.id }} {{ props.row.index }} </q-td>
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

    <q-footer bordered class="bg-white q-pa-md row justify-end">
      <q-btn color="primary" label="保  存" @click="save" />
      <q-btn class="q-ml-md" color="accent" label="还原默认" @click="reset" />
    </q-footer>
  </div>
</template>

<script>
import { ref, reactive, toRaw, onBeforeUnmount } from "vue";
import { useQuasar, uid, copyToClipboard } from "quasar";

import { setStorageLocal, getStorageLocal } from "src/utils/index.js";

const columns = [
  { name: "id", label: "", field: "id" },
  { name: "group", align: "left", label: "分组名称", field: "group" },
  { name: "name", align: "left", label: "名称", field: "name" },
  { name: "url", align: "left", label: "URL", field: "url" },
  { name: "enable", align: "left", label: "是否启用", field: "enable" },
  { name: "encode", align: "left", label: "是否编码", field: "encode" },
  { name: "c", label: "操作", field: "id", align: "left" },
];

const originalRows = [
  { id: 101, group: "默认", name: "google", url: "https://www.google.com.tw/search?q=%s", encode: false, enable: true },
  { id: 102, group: "默认", name: "百度", url: "https://www.baidu.com/search?q=%s", encode: false, enable: true },
  { id: 103, group: "默认", name: "wiki", url: "https://zh.wikipedia.org/wiki/%s", encode: false, enable: true },
  { id: 1032, group: "搜索", name: "必应", url: "http://www.bing.com/search?q=%s", encode: false, enable: true },
  { id: 10322, group: "搜索", name: "magi", url: "https://magi.com/search?q=%s", encode: false, enable: true },
  { id: 301, group: "购物", name: "值得买", url: "http://search.smzdm.com/?s=%s", encode: false, enable: true },
  { id: 302, group: "购物", name: "狗东", url: "https://search.jd.com/Search?keyword=%s", encode: false, enable: true },
  { id: 303, group: "购物", name: "亚马逊", url: "http://www.amazon.cn/keywords=%s", encode: false, enable: true },
];

export default {
  async setup() {
    const $q = useQuasar();

    // Our function which receives the URL sent by the background script.
    function doOnTabOpened(url) {
      console.log("New Browser Tab Openend: ", url);
      copyToClipboard("some text")
        .then(() => {
          // success!
        })
        .catch(() => {
          // fail
        });
    }

    // Add our listener
    $q.bex.on("bex.tab.opened", doOnTabOpened);

    // Don't forget to clean it up
    onBeforeUnmount(() => {
      $q.bex.off("bex.tab.opened", doOnTabOpened);
    });

    const pagination = ref({ page: 1, rowsPerPage: 999 });
    const loading = ref(false);
    const errorState = ref(false);
    const errorMessage = ref("");

    let data = await getStorageLocal("StrongData");

    let rows = Object.keys(data).length === 0 ? reactive(originalRows) : reactive(data.StrongData);

    return {
      pagination,
      loading,

      errorState,
      errorMessage,

      columns,
      rows,

      addRow() {
        const newRow = { id: "", group: "默认", name: "Name", url: "https://www.google.com/search?q=%s", encode: false, enable: true };
        newRow.id = uid();
        rows.push(newRow);
      },
      removeRow(id) {
        const index = rows.findIndex((n) => n.id === id);
        rows.splice(index, 1);
      },
      save() {
        $q.notify({
          message: "保存成功",
          icon: "cloud_done",
          color: "secondary",
        });
        setStorageLocal({ StrongData: toRaw(rows) });
      },
      reset() {
        $q.dialog({
          title: "提示",
          icon: "network_wifi",
          message: "确认还原默认配置？",
          cancel: true,
          ok: "确认",
          cancel: "取消",
        }).onOk(() => {
          rows.length = 0;
          rows.push(...originalRows);
          setStorageLocal({ StrongData: originalRows });
        });
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
