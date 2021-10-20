<template>
  <q-page class="flex flex-center column">
    <svg t="1634721602906" class="icon" viewBox="0 0 1072 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17746" width="100" height="100">
      <path
        d="M401.973427 107.028594A48.759513 48.759513 0 1 1 380.66552 11.850024a487.985208 487.985208 0 0 1 378.666379 70.847573 48.759513 48.759513 0 0 1-54.415616 80.940792 390.466182 390.466182 0 0 0-302.942856-56.609795z m472.967278 426.499462a48.759513 48.759513 0 0 1 96.885153 11.409727 485.644752 485.644752 0 0 1-139.452208 287.48609c-190.405899 190.405899-499.151137 190.405899-689.557036 0A486.619942 486.619942 0 0 1 2.584254 437.276777a48.759513 48.759513 0 1 1 97.031432 9.995701 390.076106 390.076106 0 0 0 663.812013 316.205443 388.125725 388.125725 0 0 0 111.561766-229.949865zM926.430751 341.366815a48.759513 48.759513 0 1 1 0-97.519027 48.759513 48.759513 0 0 1 0 97.519027z m0 97.519026a146.27854 146.27854 0 1 0 0-292.557079 146.27854 146.27854 0 0 0 0 292.557079z"
        fill="#313645"
        p-id="17747"
      ></path>
      <path
        d="M536.354645 536.404868a48.759513 48.759513 0 1 1 0-97.519027 48.759513 48.759513 0 0 1 0 97.519027z m0 97.519026a146.27854 146.27854 0 1 0 0-292.557079 146.27854 146.27854 0 0 0 0 292.557079zM146.27854 243.847788a48.759513 48.759513 0 1 1 0-97.519026 48.759513 48.759513 0 0 1 0 97.519026z m0 97.519027a146.27854 146.27854 0 1 0 0-292.557079 146.27854 146.27854 0 0 0 0 292.557079z"
        fill="#313645"
        p-id="17748"
      ></path>
      <path
        d="M856.217052 385.737972l-43.444726-87.377048-195.720686 97.421508 43.444726 87.279528L856.217052 385.737972zM466.433503 479.941351l54.12306-81.13583L228.682117 204.108785 174.559057 285.244615l291.874446 194.745496zM854.266672 765.184504l172.121081 172.121081c45.980221 45.931461-22.965731 114.926173-68.945951 68.945952l-172.121082-172.121081c-45.931461-45.931461 23.01449-114.877413 68.994711-68.945952z"
        fill="#313645"
        p-id="17749"
      ></path>
    </svg>
    <p class="text-subtitle1 q-ma-md text-weight-bold">强悍搜索 - 易用多引擎搜索</p>
    <p class="text-subtitle2 text-weight-medium">一个人性化、可自定义的多引擎搜索扩展</p>

    <q-card style="width: 98%">
      <div style="min-height: 600px">
        <q-tabs v-model="tab" inline-label active-color="primary" indicator-color="primary" align="justify">
          <q-tab name="specification" icon="article" label="使用" />
          <q-tab name="settings" icon="settings" label="配置" />
          <q-tab name="about" icon="favorite" label="关于" />
        </q-tabs>
        <q-separator />
        <div class="q-gutter-y-sm">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="specification">
              <div class="text-h6">打开引擎面板</div>
              <ol>
                <li>框选您要查找的文字，引擎面板自动弹出</li>
                <li>鼠标左键点击您需要搜索的网页，页面跳转至新页面</li>
                <li>鼠标中键（滚轮键）点击您需要搜索的网页，新页面后台开启</li>
                <li>当查找文字解析有网页地址，面板会显示 “在新标签页打开” 网页地址，方便您跳转</li>
                <li>引擎面板底部会显示框选文字复制内容，可快速复制</li>
              </ol>
            </q-tab-panel>

            <q-tab-panel name="settings" class="q-pa-none">
              <q-splitter v-model="splitterModel" style="height: 550px">
                <template v-slot:before>
                  <q-tabs v-model="innerTab" vertical active-color="primary" indicator-color="primary">
                    <q-tab name="innerCU" icon="format_align_left" label="引擎增改" />
                    <q-tab name="innerSort" icon="format_line_spacing" label="引擎排序" />
                  </q-tabs>
                </template>

                <template v-slot:after>
                  <q-tab-panels v-model="innerTab" animated transition-prev="slide-down" transition-next="slide-up">
                    <q-tab-panel name="innerCU">
                      <div class="text-h6 q-mb-md">需要同时按下 Ctrl 键触发</div>
                      <p>勾选后，打开引擎面板需按住 Ctrl 键再框选触发。</p>
                      <div class="text-h6 q-mb-md">引擎管理</div>
                      <ul>
                        <li>搜索：可根据分组名称、名称、URL 快速搜索</li>
                        <li>分组名称：同名即同组</li>
                        <li>URL：使用 %s 代替关键词</li>
                        <li>是否启用：开启后，引擎面板显示</li>
                        <li>新页面打开：开启后，使用新标签页打开</li>
                        <li>是否编码：如果遇到搜索引擎字符乱码，请尝试开启"编码"选项。</li>
                        <li>操作：删除后，需保存才生效</li>
                        <li>导入、导出配置：文件为 JSON 格式，导入配置将覆盖现有配置</li>
                        <li>保存成功：登录浏览器账号跨设备同步配置</li>
                      </ul>
                    </q-tab-panel>

                    <q-tab-panel name="innerSort">
                      <div class="text-h6 q-mb-md">引擎排序</div>
                      <p>鼠标拖拽行至您想要的顺序，排序完后保存即可。</p>
                    </q-tab-panel>
                  </q-tab-panels>
                </template>
              </q-splitter>
            </q-tab-panel>

            <q-tab-panel name="about">
              <div class="text-h6">开发者</div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar, copyToClipboard } from "quasar";

export default defineComponent({
  name: "About",
  setup() {
    return {
      tab: ref("specification"),
      innerTab: ref("innerCU"),
      splitterModel: ref(10),
    };
  },
});
</script>
