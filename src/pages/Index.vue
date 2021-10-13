<template>
  <div class="q-pa-md">
    <q-table :rows="rows" row-key="name" :columns="columns" title="引擎管理" v-model:pagination="pagination" hide-pagination>
      <template v-slot:buttom>
        <q-btn color="primary" :disable="loading" label="Add row" @click="addRow" />
        <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" />
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
            <q-toggle v-model="props.row.enable" checked-icon="check_circle_outline" unchecked-icon="highlight_off" color="secondary"/>
                <q-tooltip
                  transition-show="scale"
                  transition-hide="scale"
                >
                  Here I am!
                </q-tooltip>
          </q-td>
          <q-td key="encode" style="width: 100px">
            <q-toggle v-model="props.row.encode" checked-icon="code" unchecked-icon="code_off" color="secondary" />
          </q-td>
          <q-td key="id" style="width: 100px">
            <q-btn flat round color="accent" icon="delete_forever" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="row justify-center">
      <q-btn class="q-mt-md" color="secondary" label="添加引擎" @click="addRow" />
    </div>
    <!-- <q-separator class="q-my-lg" /> -->

    <q-footer bordered class="bg-white q-pa-md row justify-end">
      <q-btn color="primary" label="保  存" @click="addRow" />
      <q-btn class="q-ml-md" color="accent" label="还原默认" @click="addRow" />
    </q-footer>
  </div>
</template>

<script>
import { ref } from "vue";
import { setStorageLocal } from "src/utils/index.js";

const columns = [
  // { name: "id", label: "", field: "id" },
  { name: "group", align: "left", label: "分组名称", field: "group" },
  { name: "name", align: "left", label: "名称", field: "name" },
  { name: "url", align: "left", label: "URL", field: "url" },
  { name: "enable", align: "left", label: "是否启用", field: "enable" },
  { name: "encode", align: "left", label: "是否编码", field: "encode" },
  { name: "c", label: "操作", field: "id", align: "left" },
];

const rows = [
  { id: 101, group: "默认", name: "google", url: "https://www.google.com.tw/search?q=%s", encode: false, enable: true },
  { id: 102, group: "默认", name: "百度", url: "https://www.baidu.com/search?q=%s", encode: false, enable: true },
  { id: 103, group: "默认", name: "wiki", url: "https://zh.wikipedia.org/wiki/%s", encode: false, enable: true },
  { id: 1032, group: "搜索", name: "必应", url: "http://www.bing.com/search?q=%s", encode: false, enable: true },
  { id: 10322, group: "搜索", name: "magi", url: "https://magi.com/search?q=%s", encode: false, enable: true },
  { id: 301, group: "购物", name: "值得买", url: "http://search.smzdm.com/?s=%s", encode: false, enable: true },
  { id: 302, group: "购物", name: "狗东", url: "https://search.jd.com/Search?keyword=%s", encode: false, enable: true },
  { id: 303, group: "购物", name: "亚马逊", url: "http://www.amazon.cn/keywords=%s", encode: false, enable: true },
  { id: 301, group: "购物", name: "值得买", url: "http://search.smzdm.com/?s=%s", encode: false, enable: true },
  { id: 302, group: "购物", name: "狗东", url: "https://search.jd.com/Search?keyword=%s", encode: false, enable: true },
  { id: 303, group: "购物", name: "亚马逊", url: "http://www.amazon.cn/keywords=%s", encode: false, enable: true },
  { id: 301, group: "购物", name: "值得买", url: "http://search.smzdm.com/?s=%s", encode: false, enable: true },
  { id: 302, group: "购物", name: "狗东", url: "https://search.jd.com/Search?keyword=%s", encode: false, enable: true },
  { id: 303, group: "购物", name: "亚马逊", url: "http://www.amazon.cn/keywords=%s", encode: false, enable: true },
];

export default {
  setup() {
    const pagination = ref({ page: 1, rowsPerPage: 999 });
    const loading = ref(false);
    const errorState = ref(false);
    const errorMessage = ref("");

    return {
      pagination,
      loading,

      errorState,
      errorMessage,

      columns,
      rows: ref(rows),

      addRow() {
        loading.value = true;
        setTimeout(() => {
          const index = Math.floor(Math.random() * (rows.value.length + 1)),
            row = originalRows[Math.floor(Math.random() * originalRows.length)];

          if (rows.value.length === 0) {
            rowCount.value = 0;
          }

          row.id = ++rowCount.value;
          const newRow = { ...row }; // extend({}, row, { name: `${row.name} (${row.__count})` })
          rows.value = [...rows.value.slice(0, index), newRow, ...rows.value.slice(index)];
          loading.value = false;
        }, 500);
      },
      removeRow() {
        loading.value = true;
        setTimeout(() => {
          const index = Math.floor(Math.random() * rows.value.length);
          rows.value = [...rows.value.slice(0, index), ...rows.value.slice(index + 1)];
          loading.value = false;
        }, 500);
      },
      save() {
        setStorageLocal({ rows });
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
