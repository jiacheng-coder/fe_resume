import { f as defineComponent, g as createElementBlock, h as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, i as createStaticVNode, o as openBlock, j as copyToClipboard, k as renderList, l as createTextVNode, m as createVNode } from "./node-modules.99f66ea9.js";
import { _ as _export_sfc } from "./index.e0716354.js";
const _imports_0$1 = "/fe_resume/assets/avatar.9b3b448e.jpg";
const _imports_1 = "/fe_resume/assets/wechat.8cecc907.svg";
const _imports_2 = "/fe_resume/assets/phone.e5887e9e.svg";
const _imports_3 = "/fe_resume/assets/email.06284f48.svg";
const _imports_4 = "/fe_resume/assets/link.bd39abe6.svg";
const _imports_5 = "/fe_resume/assets/introduce.10f31a20.svg";
const _imports_6 = "/fe_resume/assets/github-fill.6ccda0b8.svg";
const _imports_7 = "/fe_resume/assets/Notion.cde23a08.svg";
const _hoisted_1$8 = /* @__PURE__ */ createStaticVNode('<div><input type="checkbox" id="my-modal" class="modal-toggle"><label for="my-modal" class="modal cursor-pointer"><label class="modal-box relative" for=""><h3 class="text-lg font-bold">\u63D0\u793A!</h3><p class="py-4">\u5185\u5BB9\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F</p></label></label></div>', 1);
const _hoisted_2$6 = { class: "p-4 h-full text-white duration-300 rounded-sm bg-my-green flex items-center gap-4" };
const _hoisted_3$6 = /* @__PURE__ */ createBaseVNode("div", { class: "flex items-center" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "h-40 rounded-lg",
    src: _imports_0$1
  })
], -1);
const _hoisted_4$4 = { class: "h-40 flex flex-col justify-evenly" };
const _hoisted_5$2 = { class: "text-2xl font-bold" };
const _hoisted_6$2 = { class: "text-xl font-bold" };
const _hoisted_7$2 = { class: "flex gap-6 cursor-pointer" };
const _hoisted_8$2 = /* @__PURE__ */ createBaseVNode("section", null, [
  /* @__PURE__ */ createBaseVNode("h1", null, "\u8054\u7CFB\u65B9\u5F0F:")
], -1);
const _hoisted_9$2 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_1,
  alt: ""
}, null, -1);
const _hoisted_10$2 = { for: "my-modal" };
const _hoisted_11$2 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_2,
  alt: ""
}, null, -1);
const _hoisted_12$2 = { for: "my-modal" };
const _hoisted_13$1 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_3,
  alt: ""
}, null, -1);
const _hoisted_14$1 = { for: "my-modal" };
const _hoisted_15 = { class: "flex gap-6 cursor-pointer" };
const _hoisted_16 = /* @__PURE__ */ createBaseVNode("section", null, [
  /* @__PURE__ */ createBaseVNode("h1", null, "\u94FE\u63A5:")
], -1);
const _hoisted_17 = ["href"];
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_4,
  alt: "",
  class: "header-icon"
}, null, -1);
const _hoisted_19 = /* @__PURE__ */ createBaseVNode("span", { class: "border-b-2 border-white" }, "Resume", -1);
const _hoisted_20 = [
  _hoisted_18,
  _hoisted_19
];
const _hoisted_21 = ["href"];
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_5,
  alt: "",
  class: "header-icon"
}, null, -1);
const _hoisted_23 = /* @__PURE__ */ createBaseVNode("span", { class: "border-b-2 border-white" }, "Blog", -1);
const _hoisted_24 = [
  _hoisted_22,
  _hoisted_23
];
const _hoisted_25 = ["href"];
const _hoisted_26 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_6,
  alt: "",
  class: "header-icon"
}, null, -1);
const _hoisted_27 = /* @__PURE__ */ createBaseVNode("span", { class: "border-b-2 border-white" }, "Github", -1);
const _hoisted_28 = [
  _hoisted_26,
  _hoisted_27
];
const _hoisted_29 = ["href"];
const _hoisted_30 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_7,
  alt: "",
  class: "header-icon"
}, null, -1);
const _hoisted_31 = /* @__PURE__ */ createBaseVNode("span", { class: "border-b-2 border-white" }, "Notion", -1);
const _hoisted_32 = [
  _hoisted_30,
  _hoisted_31
];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    userInfo: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const { userInfo: userInfo2 } = props;
    let copyText = (text) => [
      copyToClipboard(text)
    ];
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1$8,
        createBaseVNode("div", _hoisted_2$6, [
          _hoisted_3$6,
          createBaseVNode("div", _hoisted_4$4, [
            createBaseVNode("h1", _hoisted_5$2, toDisplayString((_a = unref(userInfo2)) == null ? void 0 : _a.name), 1),
            createBaseVNode("h1", _hoisted_6$2, toDisplayString((_b = unref(userInfo2)) == null ? void 0 : _b.job), 1),
            createBaseVNode("div", _hoisted_7$2, [
              _hoisted_8$2,
              createBaseVNode("section", {
                class: "flex gap-1",
                onClick: _cache[0] || (_cache[0] = ($event) => {
                  var _a2;
                  return unref(copyText)(((_a2 = unref(userInfo2)) == null ? void 0 : _a2.wechat) || "");
                })
              }, [
                _hoisted_9$2,
                createBaseVNode("label", _hoisted_10$2, toDisplayString((_c = unref(userInfo2)) == null ? void 0 : _c.wechat), 1)
              ]),
              createBaseVNode("section", {
                class: "flex gap-1",
                onClick: _cache[1] || (_cache[1] = ($event) => {
                  var _a2;
                  return unref(copyText)(((_a2 = unref(userInfo2)) == null ? void 0 : _a2.phone) || "");
                })
              }, [
                _hoisted_11$2,
                createBaseVNode("label", _hoisted_12$2, toDisplayString((_d = unref(userInfo2)) == null ? void 0 : _d.phone), 1)
              ]),
              createBaseVNode("section", {
                class: "flex gap-1",
                onClick: _cache[2] || (_cache[2] = ($event) => {
                  var _a2;
                  return unref(copyText)(((_a2 = unref(userInfo2)) == null ? void 0 : _a2.email) || "");
                })
              }, [
                _hoisted_13$1,
                createBaseVNode("label", _hoisted_14$1, toDisplayString((_e = unref(userInfo2)) == null ? void 0 : _e.email), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_15, [
              _hoisted_16,
              createBaseVNode("a", {
                href: (_f = unref(userInfo2)) == null ? void 0 : _f.resumeUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "flex gap-1 items-center"
              }, _hoisted_20, 8, _hoisted_17),
              createBaseVNode("a", {
                href: (_g = unref(userInfo2)) == null ? void 0 : _g.blogUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "flex gap-1 items-center"
              }, _hoisted_24, 8, _hoisted_21),
              createBaseVNode("a", {
                href: (_h = unref(userInfo2)) == null ? void 0 : _h.githubUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "flex gap-1 items-center"
              }, _hoisted_28, 8, _hoisted_25),
              createBaseVNode("a", {
                href: (_i = unref(userInfo2)) == null ? void 0 : _i.notionUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                class: "flex gap-1 items-center"
              }, _hoisted_32, 8, _hoisted_29)
            ])
          ])
        ])
      ], 64);
    };
  }
});
const _hoisted_1$7 = { class: "mx-4 mb-6" };
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u4E2A\u4EBA\u4F18\u52BF", -1);
const _hoisted_3$5 = /* @__PURE__ */ createBaseVNode("span", { class: "iconfont icon-pointer mr-2" }, null, -1);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    features: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        _hoisted_2$5,
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.features, (feature) => {
          return openBlock(), createElementBlock("p", {
            class: "text-md",
            key: feature
          }, [
            _hoisted_3$5,
            createTextVNode(" " + toDisplayString(feature), 1)
          ]);
        }), 128))
      ]);
    };
  }
});
const _sfc_main$6 = {};
const _hoisted_1$6 = { class: "mx-4 mb-6" };
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u6559\u80B2\u7ECF\u5386", -1);
const _hoisted_3$4 = /* @__PURE__ */ createBaseVNode("div", { class: "flex justify-between text-xl" }, [
  /* @__PURE__ */ createBaseVNode("text", null, "\u91CD\u5E86\u5927\u5B66"),
  /* @__PURE__ */ createBaseVNode("text", null, "\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66"),
  /* @__PURE__ */ createBaseVNode("text", null, "2020 - 2024")
], -1);
const _hoisted_4$3 = [
  _hoisted_2$4,
  _hoisted_3$4
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, _hoisted_4$3);
}
const Education = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render]]);
const _hoisted_1$5 = { class: "mx-4" };
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-8 text-3xl text-gray-700 font-bold" }, "\u6280\u672F\u6808", -1);
const _hoisted_3$3 = { class: "flex flex-wrap" };
const _hoisted_4$2 = { class: "mr-2 my-1 rounded-full border px-4 text-sm py-2 font-medium bg-gray-200 hover:text-white duration-300 hover:bg-my-green hover:cursor-pointer skill" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    skills: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        _hoisted_2$3,
        createBaseVNode("ul", _hoisted_3$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.skills, (skill) => {
            return openBlock(), createElementBlock("li", {
              class: "mb-6",
              key: skill
            }, [
              createBaseVNode("div", null, [
                createBaseVNode("span", _hoisted_4$2, toDisplayString(skill), 1)
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const _hoisted_1$4 = { class: "mx-4 mb-6" };
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u83B7\u5956\u7ECF\u5386", -1);
const _hoisted_3$2 = /* @__PURE__ */ createBaseVNode("span", { class: "iconfont icon-pointer mr-2" }, null, -1);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    prizes: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        _hoisted_2$2,
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.prizes, (item) => {
          return openBlock(), createElementBlock("div", { key: item }, [
            _hoisted_3$2,
            createBaseVNode("text", null, toDisplayString(item), 1)
          ]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$3 = { class: "mx-4 mb-6" };
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u9879\u76EE\u7ECF\u5386", -1);
const _hoisted_3$1 = { class: "text-2xl font-medium text-gray-800" };
const _hoisted_4$1 = {
  class: "flex text-xl font-medium text-gray-800 justify-between",
  style: { "align-items": "center" }
};
const _hoisted_5$1 = { class: "border-b-4 border-my-green" };
const _hoisted_6$1 = { class: "text-md" };
const _hoisted_7$1 = { class: "mt-1" };
const _hoisted_8$1 = /* @__PURE__ */ createBaseVNode("text", { class: "mr-4 font-semibold" }, "\u9879\u76EE\u63CF\u8FF0:", -1);
const _hoisted_9$1 = /* @__PURE__ */ createBaseVNode("p", { class: "mr-4 font-semibold" }, "\u9879\u76EE\u804C\u8D23:", -1);
const _hoisted_10$1 = /* @__PURE__ */ createBaseVNode("span", { class: "iconfont icon-pointer mr-2" }, null, -1);
const _hoisted_11$1 = { class: "flex justify-between" };
const _hoisted_12$1 = /* @__PURE__ */ createBaseVNode("text", { class: "mr-4 font-semibold" }, "\u6280\u672F\u6808:", -1);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    experience: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        _hoisted_2$1,
        createBaseVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.experience, (item) => {
            return openBlock(), createElementBlock("li", {
              class: "mb-4",
              key: JSON.stringify(item)
            }, [
              createBaseVNode("text", _hoisted_3$1, toDisplayString(item.company), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(item.projects, (project) => {
                return openBlock(), createElementBlock("div", {
                  class: "mb-2",
                  key: project.name
                }, [
                  createBaseVNode("div", _hoisted_4$1, [
                    createBaseVNode("text", _hoisted_5$1, toDisplayString(project.name), 1),
                    createBaseVNode("text", null, toDisplayString(project.job), 1),
                    createBaseVNode("text", null, toDisplayString(project.time), 1)
                  ]),
                  createBaseVNode("div", _hoisted_6$1, [
                    createBaseVNode("div", _hoisted_7$1, [
                      _hoisted_8$1,
                      createBaseVNode("text", null, toDisplayString(project.introduce), 1)
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_9$1,
                      (openBlock(true), createElementBlock(Fragment, null, renderList(project.myContribution, (item2) => {
                        return openBlock(), createElementBlock("div", { key: item2 }, [
                          _hoisted_10$1,
                          createBaseVNode("text", null, toDisplayString(item2), 1)
                        ]);
                      }), 128))
                    ]),
                    createBaseVNode("div", _hoisted_11$1, [
                      createBaseVNode("div", null, [
                        _hoisted_12$1,
                        createBaseVNode("text", null, toDisplayString(project.skills), 1)
                      ])
                    ])
                  ])
                ]);
              }), 128))
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const _imports_0 = "/fe_resume/assets/favicon-mt.a6f4dd99.ico";
const _hoisted_1$2 = { class: "mx-4 mb-6" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u5B9E\u4E60\u7ECF\u5386", -1);
const _hoisted_3 = { class: "mb-2 flex items-center" };
const _hoisted_4 = { class: "text-2xl font-medium text-gray-800" };
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  alt: "",
  class: "ml-2 w-9"
}, null, -1);
const _hoisted_6 = {
  class: "flex text-xl font-medium text-gray-800 justify-between",
  style: { "align-items": "center" }
};
const _hoisted_7 = { class: "border-b-4 border-my-green" };
const _hoisted_8 = { class: "text-md" };
const _hoisted_9 = { class: "mt-1" };
const _hoisted_10 = /* @__PURE__ */ createBaseVNode("text", { class: "mr-4 font-semibold" }, "\u9879\u76EE\u63CF\u8FF0:", -1);
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("p", { class: "mr-4 font-semibold" }, "\u9879\u76EE\u804C\u8D23:", -1);
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("span", { class: "iconfont icon-pointer mr-2" }, null, -1);
const _hoisted_13 = { class: "flex justify-between" };
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("text", { class: "mr-4 font-semibold" }, "\u6280\u672F\u6808:", -1);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    internship: {
      type: Array
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _hoisted_2,
        createBaseVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.internship, (item) => {
            return openBlock(), createElementBlock("li", {
              class: "mb-4",
              key: JSON.stringify(item.projects)
            }, [
              createBaseVNode("div", _hoisted_3, [
                createBaseVNode("text", _hoisted_4, toDisplayString(item.company), 1),
                _hoisted_5
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(item.projects, (project) => {
                return openBlock(), createElementBlock("div", {
                  class: "mb-2",
                  key: project.name
                }, [
                  createBaseVNode("div", _hoisted_6, [
                    createBaseVNode("text", _hoisted_7, toDisplayString(project.name), 1),
                    createBaseVNode("text", null, toDisplayString(project.job), 1),
                    createBaseVNode("text", null, toDisplayString(project.time), 1)
                  ]),
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("div", _hoisted_9, [
                      _hoisted_10,
                      createBaseVNode("text", null, toDisplayString(project.introduce), 1)
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_11,
                      (openBlock(true), createElementBlock(Fragment, null, renderList(project.myContribution, (item2) => {
                        return openBlock(), createElementBlock("div", { key: item2 }, [
                          _hoisted_12,
                          createBaseVNode("text", null, toDisplayString(item2), 1)
                        ]);
                      }), 128))
                    ]),
                    createBaseVNode("div", _hoisted_13, [
                      createBaseVNode("div", null, [
                        _hoisted_14,
                        createBaseVNode("text", null, toDisplayString(project.skills), 1)
                      ])
                    ])
                  ])
                ]);
              }), 128))
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "pt-4 h-full" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    skills: {
      type: Array
    },
    prizes: {
      type: Array
    },
    features: {
      type: Array
    },
    experience: {
      type: Array
    },
    internship: {
      type: []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(_sfc_main$7, { features: __props.features }, null, 8, ["features"]),
        createVNode(Education),
        createVNode(_sfc_main$2, { internship: __props.internship }, null, 8, ["internship"]),
        createVNode(_sfc_main$3, { experience: __props.experience }, null, 8, ["experience"]),
        createVNode(_sfc_main$4, { prizes: __props.prizes }, null, 8, ["prizes"]),
        createVNode(_sfc_main$5, { skills: __props.skills }, null, 8, ["skills"])
      ]);
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_c5c1bad0_lang = "";
const Main = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c5c1bad0"]]);
const name = "zhujiacheng";
const age = 18;
const userInfo = {
  name: "\u8BF8\u5609\u8BDA",
  job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
  email: "2253541907@qq.com",
  phone: "15023092023",
  wechat: "zaqwertyuioplm7412",
  resumeUrl: "https://jiacheng-coder.github.io/fe_resume/",
  blogUrl: "https://jiacheng-coder.github.io/my-blog",
  githubUrl: "https://github.com/jiacheng-coder",
  notionUrl: "https://fir-supply-fbd.notion.site/FE-70100f740395477ba01ad7a2f5a33dfc?pvs=4"
};
const skills = [
  "Vue 2/3",
  "React 18",
  "Vue Router / React Router",
  "Pinia / Mobx",
  "Miniprogram",
  "Uniapp",
  "Roo UI / Antd Design",
  "TailwindCSS / DaisyUI",
  "Color UI / Grace UI"
];
const prizes = [
  "\u7B2C\u56DB\u5C4A - \u5B57\u8282\u8DF3\u52A8 - \u524D\u7AEF\u9752\u8BAD\u8425 - \u7801\u5982\u78D0\u77F3\u5956",
  "2021\u5E74\u5168\u56FD\u5927\u5B66\u751F\u6570\u5B66\u7ADE\u8D5B - \u91CD\u5E86\u8D5B\u533A - \u7701\u7EA7\u4E09\u7B49\u5956"
];
const features = [
  "\u7CBE\u901A HTML5, CSS3, ES6, TS, \u719F\u6089\u5E38\u89C4\u7684 W3C \u6807\u51C6\u4E0E ECMA \u89C4\u8303;",
  "\u5177\u5907 Vue \u548C React \u7B49 MVVM \u6846\u67B6\u5F00\u53D1\u7ECF\u9A8C, \u80FD\u591F\u7ED3\u5408\u5DF2\u6709\u57FA\u5EFA\u5FEB\u901F\u5B8C\u6210\u9700\u6C42;",
  "\u719F\u6089 \u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u548C Uniapp \u7684\u5F00\u53D1\u6D41\u7A0B, \u62E5\u6709\u5355\u65E5\u7D2F\u8BA1\u6253\u5F00\u6B21\u657010\u4E07+\u5C0F\u7A0B\u5E8F\u7684\u5F00\u53D1\u4E0E\u7EF4\u62A4\u7ECF\u9A8C;",
  "\u719F\u7EC3\u4F7F\u7528 Webpack, Vite \u7B49\u6253\u5305\u6784\u5EFA\u5DE5\u5177, \u5BF9\u6253\u5305\u6784\u5EFA\u6D41\u7A0B\u6709\u4E00\u5B9A\u4E86\u89E3;",
  "\u5BF9\u524D\u7AEF\u6027\u80FD\u4F18\u5316\u6709\u4E00\u5B9A\u4E86\u89E3, \u843D\u5730\u5B9E\u73B0\u8FC7 \u9996\u5C4F\u52A0\u8F7D\u4F18\u5316 \u53CA gzip\u538B\u7F29 \u7B49\u4F18\u5316\u624B\u6BB5;",
  "\u719F\u6089 Formily \u8868\u5355\u89E3\u51B3\u65B9\u6848, \u5305\u62EC\u5404\u79CD\u5B57\u6BB5\u7684\u8054\u52A8\u95EE\u9898\u548C\u5F02\u6B65\u6821\u9A8C\u573A\u666F\u7684\u5904\u7406;",
  "\u719F\u6089 ColorUI, TailwindCSS, RooUI / Antd \u7EC4\u4EF6\u5E93, \u80FD\u591F\u9488\u5BF9\u5177\u4F53\u4E1A\u52A1\u5BF9\u7EC4\u4EF6\u5E93\u8FDB\u884C\u4E8C\u6B21\u5F00\u53D1;",
  "\u6709\u5199\u535A\u5BA2\u7684\u4E60\u60EF, \u5173\u6CE8\u7528\u6237\u4F53\u9A8C, \u6CE8\u91CD\u6280\u672F\u79EF\u7D2F\u4E0E\u65B0\u6280\u672F\u7684\u63A2\u7D22, \u5177\u6709\u826F\u597D\u7684\u6C9F\u901A\u548C\u56E2\u961F\u534F\u4F5C\u80FD\u529B;"
];
const experience = [
  {
    company: "\u91CD\u5E86\u7535\u8986\u8005\u79D1\u6280\u6709\u9650\u516C\u53F8",
    projects: [
      {
        name: "WeCQU\u5C0F\u7A0B\u5E8F",
        job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
        time: "2022.9 - 2023.8",
        introduce: "\u9762\u5411\u5927\u5B66\u751F\u7FA4\u4F53\u7684\u6821\u56ED\u4E00\u4F53\u5316\u67E5\u8BE2\u5C0F\u7A0B\u5E8F, \u5355\u65E5\u5DC5\u5CF0\u7D2F\u8BA1\u6253\u5F00\u6B21\u657010\u4E07+",
        myContribution: [
          "\u91CD\u6784\u9875\u9762 UI , \u7B80\u5316\u539F\u6709 JS \u903B\u8F91, \u603B\u91CD\u6784\u7387\u7EA650%",
          "\u5BF9\u7EC4\u4EF6\u5E93\u4E2D\u7684\u8F6E\u64AD\u56FE\u7EC4\u4EF6\u8FDB\u884C\u4E8C\u6B21\u5C01\u88C5, \u5B9E\u73B0\u70B9\u51FB\u8DF3\u8F6C webview \u516C\u4F17\u53F7\u63A8\u6587\u7684\u529F\u80FD",
          "\u4F7F\u7528 promise \u5C01\u88C5 wx.request \u548C wx.showModal \u8BF7\u6C42",
          "\u901A\u8FC7\u9632\u6296\u9632\u6B62\u767B\u5F55\u8BF7\u6C42\u7684\u91CD\u590D\u53D1\u9001, \u51CF\u8F7B\u670D\u52A1\u5668\u538B\u529B",
          "\u901A\u8FC7 setStorage \u5B9E\u73B0\u6570\u636E\u6301\u4E45\u5316, \u5305\u62EC\u7528\u6237\u5934\u50CF\u4E0E\u8BFE\u8868\u4FE1\u606F\u7684\u5B58\u50A8\u7B49"
        ],
        skills: "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F + JS + ColorUI + GraceUI 3",
        more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/Wecqu.html"
      },
      {
        name: "\u751F\u6001\u5708\u6821\u56ED\u8BBA\u575B",
        job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
        time: "2022.12 - 2023.3",
        introduce: "\u57FA\u4E8E Uniapp \u5F00\u53D1\u7684\u9AD8\u6821\u8BBA\u575B\u7C7BH5\u5E94\u7528, \u5F71\u54CD\u529B\u6DB5\u76D6\u5DDD\u5927\u3001\u91CD\u5927\u7B49\u591A\u6240\u9AD8\u6821",
        myContribution: [
          "\u57FA\u4E8E Vue \u7684\u52A8\u6001\u7EC4\u4EF6\u5B9E\u73B0tabs\u5207\u6362\u4E0D\u540C\u7EC4\u4EF6\u7684\u529F\u80FD, \u4F18\u5316\u9875\u9762\u6E32\u67D3\u6548\u7387",
          "\u57FA\u4E8E vue-virtual-scroller \u865A\u62DF\u6EDA\u52A8\u65B9\u6848\u5B9E\u73B0APP\u7684\u9996\u5C4F\u6E32\u67D3\u4F18\u5316",
          "\u4F7F\u7528 Vue3.2 \u7684 v-memo, v-once Hooks \u8FDB\u884C\u957F\u5217\u8868\u4F18\u5316",
          "\u57FA\u4E8E\u5355\u4F8B\u6A21\u5F0F\u7684\u601D\u60F3, \u4F7F\u7528Vuex\u8FDB\u884C\u5168\u5C40\u72B6\u6001\u7BA1\u7406, \u7EDF\u4E00\u66B4\u9732\u63A5\u53E3\u5BF9\u901A\u7528\u6570\u636E\u8FDB\u884CCRUD",
          "\u57FA\u4E8E watch \u4FA6\u542C\u5668\u4E0E Vuex \u7684 getters \u642D\u5EFA\u7CFB\u7EDF\u7684\u6D88\u606F\u63D0\u9192\u6A21\u5757"
        ],
        skills: "Vue + ES6 + Uniapp + GraceUI 5",
        more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/ecosystem.html"
      }
    ]
  }
];
const internship = [
  {
    company: "\u7F8E\u56E2",
    icon: "@/assets/icons/favicon-mt.ico",
    projects: [
      {
        name: "\u97E6\u6069\u7CFB\u7EDF",
        job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
        time: "2023.6 - 2023.9",
        introduce: "\u63D0\u62A5\u6D3B\u52A8\u5168\u94FE\u8DEF\u914D\u7F6E\u7684 M \u7AEF\u7CFB\u7EDF, \u57FA\u4E8E React \u5168\u5BB6\u6876\u3001Vite \u6253\u5305\u5DE5\u5177\u843D\u5730\u4E1A\u52A1\u5F00\u53D1\u3002",
        myContribution: [
          "\u8D1F\u8D23\u5386\u53F2\u97E6\u6069\u7CFB\u7EDF\u7684\u8FED\u4EE3\u5347\u7EA7\u5DE5\u4F5C, \u62BD\u79BB\u63D0\u62A5\u4E1A\u52A1\u903B\u8F91, \u7F51\u7EDC\u8BF7\u6C42\u5355\u4F8B\u6A21\u5F0F\u7EDF\u4E00\u5904\u7406, \u589E\u5F3A\u7CFB\u7EDF\u7684\u5065\u58EE\u6027\u548C\u53EF\u7EF4\u62A4\u6027",
          "\u57FA\u4E8E Roo Plus \u91CD\u6784\u90E8\u5206\u4E1A\u52A1\u7EC4\u4EF6, \u4F18\u5316\u9875\u9762\u7EC4\u7EC7\u65B9\u5F0F, \u51CF\u5C11\u4E86\u6240\u7EF4\u62A4\u9875\u9762 30% \u5DE6\u53F3\u7684\u4EE3\u7801\u91CF",
          "\u7ED3\u5408 PRD \u4F18\u5316\u539F\u63D0\u62A5\u4E1A\u52A1\u7684\u914D\u7F6E\u6D41\u7A0B, \u6253\u901A\u65B0\u795E\u4EF7\u6D3B\u52A8\u7684\u914D\u7F6E\u94FE\u8DEF, \u540C\u65F6\u505A\u5230\u5BF9\u8001\u795E\u4EF7\u6D3B\u52A8\u7684\u517C\u5BB9, \u4FC3\u6210\u8FD0\u8425\u63D0\u6548",
          "\u57FA\u4E8E Vite \u6253\u5305\u6784\u5EFA\u5DE5\u5177\u5BF9\u539F\u6709\u9879\u76EE\u8FDB\u884C\u6253\u5305\u914D\u7F6E\u4F18\u5316, \u5305\u62EC\u914D\u7F6E\u522B\u540D\u3001\u5206\u5305\u7B56\u7565\u548C gzip \u538B\u7F29\u7B49, \u5B9E\u73B0\u5F00\u53D1\u63D0\u6548",
          "\u68B3\u7406 \u9700\u6C42\u8BC4\u5BA1 - \u5F00\u53D1 - \u8054\u8C03 - \u6D4B\u8BD5 - \u9884\u53D1 - \u4E0A\u7EBF \u7684\u5168\u94FE\u8DEF\u5F00\u53D1\u6D41\u7A0B, \u4EA7\u51FA\u6280\u672F\u6587\u6863\u5E76\u5728\u7EC4\u5185\u63A8\u5E7F"
        ],
        skills: "React 18 + TS + Roo Plus + Vite"
      },
      {
        name: "\u901A\u7528\u62DB\u5546\u5E73\u53F0",
        job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
        time: "2023.6 - 2023.9",
        introduce: "\u57FA\u4E8E\u5FAE\u524D\u7AEF\u548C Formily \u8868\u5355\u89E3\u51B3\u65B9\u6848\u642D\u5EFA\u7684\u901A\u7528\u62DB\u5546\u7CFB\u7EDF\u3002",
        myContribution: [
          "\u8D1F\u8D23\u62A5\u540D\u7ED3\u679C\u9875\u9762\u7684\u914D\u7F6E\u56DE\u663E, \u89E3\u51B3-margin\u7684\u6837\u5F0F\u6EA2\u51FA\u95EE\u9898",
          "\u8D1F\u8D23\u5404\u79CD\u5217\u8868\u9875\u7684\u642D\u5EFA, \u5E76\u57FA\u4E8E RooUI \u548C\u4E1A\u52A1\u903B\u8F91\u4E8C\u6B21\u5C01\u88C5\u901A\u7528\u67E5\u8BE2\u548C\u901A\u7528\u5217\u8868\u7EC4\u4EF6, \u63D0\u9AD8\u7CFB\u7EDF\u53EF\u7EF4\u62A4\u6027",
          "\u4F18\u5316\u539F\u6709\u914D\u7F6E\u6D41\u7A0B, \u5C01\u88C5\u76EE\u5F55\u7EC4\u4EF6, \u5B9E\u73B0\u914D\u7F6E\u6D41\u7A0B\u7684\u53EF\u89C6\u5316, \u63D0\u9AD8\u8FD0\u8425\u4EBA\u5458\u7684\u914D\u7F6E\u6548\u7387",
          "\u57FA\u4E8E Formily \u8868\u5355\u89E3\u51B3\u65B9\u6848, \u5904\u7406\u65B9\u6848\u521B\u5EFA\u548C\u6D3B\u52A8\u521B\u5EFA\u65F6\u7684\u8054\u52A8\u573A\u666F\u548C\u5F02\u6B65\u6821\u9A8C\u95EE\u9898, \u5E76\u5728\u7EC4\u5185\u5F00\u5C55\u6280\u672F\u5206\u4EAB"
        ],
        skills: "React 18 + TS + RooUI + Vite + Formily + Monorepo"
      }
    ]
  }
];
const Info = {
  name,
  age,
  userInfo,
  skills,
  prizes,
  features,
  experience,
  internship
};
const _hoisted_1 = {
  id: "home",
  class: "max-w-screen-lg mx-auto p-4 hover:shadow-2xl"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const { userInfo: userInfo2, skills: skills2, features: features2, experience: experience2, prizes: prizes2, internship: internship2 } = Info;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_sfc_main$8, { userInfo: unref(userInfo2) }, null, 8, ["userInfo"]),
        createVNode(Main, {
          skills: unref(skills2),
          features: unref(features2),
          experience: unref(experience2),
          prizes: unref(prizes2),
          internship: unref(internship2)
        }, null, 8, ["skills", "features", "experience", "prizes", "internship"])
      ]);
    };
  }
});
const index_vue_vue_type_style_index_0_lang = "";
export {
  _sfc_main as default
};
