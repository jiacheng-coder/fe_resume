import { f as defineComponent, o as openBlock, g as createElementBlock, h as createBaseVNode, t as toDisplayString, u as unref, F as Fragment, i as createStaticVNode, j as copyToClipboard, k as renderList, l as createTextVNode, m as createVNode } from "./node-modules.99f66ea9.js";
import { _ as _export_sfc } from "./index.39a4a6e6.js";
const _imports_0$1 = "/fe_resume/assets/avatar.9b3b448e.jpg";
const _imports_1 = "/fe_resume/assets/\u5FAE\u4FE1_wechat.8cecc907.svg";
const _imports_2 = "/fe_resume/assets/\u7535\u8BDD\u547C\u53EB_phone-call.e5887e9e.svg";
const _imports_3 = "/fe_resume/assets/\u53D1\u9001\u90AE\u4EF6_send-email.06284f48.svg";
const _imports_4 = "/fe_resume/assets/\u7784\u51C6_aiming.46c902dd.svg";
const _hoisted_1$8 = /* @__PURE__ */ createStaticVNode('<div><input type="checkbox" id="my-modal" class="modal-toggle"><label for="my-modal" class="modal cursor-pointer"><label class="modal-box relative" for=""><h3 class="text-lg font-bold">\u63D0\u793A!</h3><p class="py-4">\u5185\u5BB9\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F</p></label></label></div>', 1);
const _hoisted_2$7 = {
  class: "p-4 h-full text-white shadow-2xl duration-300 rounded-sm",
  style: { "background-color": "#42946C" }
};
const _hoisted_3$7 = { class: "md:block" };
const _hoisted_4$5 = /* @__PURE__ */ createBaseVNode("div", { class: "flex justify-center" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    class: "h-40 mx-4 rounded-lg",
    src: _imports_0$1
  })
], -1);
const _hoisted_5$2 = { class: "text-center mt-10 justify-center items-center" };
const _hoisted_6$2 = { class: "text-xl font-bold" };
const _hoisted_7$2 = { class: "md:text-lg mt-4" };
const _hoisted_8$2 = /* @__PURE__ */ createBaseVNode("hr", {
  class: "pb-1 mt-6",
  style: { "color": "#3C855D" }
}, null, -1);
const _hoisted_9$2 = {
  class: "mb-10 ml-8 mr-4 md:block",
  style: { "cursor": "pointer" }
};
const _hoisted_10$2 = /* @__PURE__ */ createBaseVNode("div", { class: "mr-2 flex justify-center items-center" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_1,
    alt: ""
  })
], -1);
const _hoisted_11$2 = {
  for: "my-modal",
  style: { "cursor": "pointer" }
};
const _hoisted_12$2 = /* @__PURE__ */ createBaseVNode("div", { class: "mr-2 flex justify-center items-center" }, [
  /* @__PURE__ */ createBaseVNode("img", { src: _imports_2 })
], -1);
const _hoisted_13$2 = {
  for: "my-modal",
  style: { "cursor": "pointer" }
};
const _hoisted_14$2 = /* @__PURE__ */ createBaseVNode("div", { class: "mr-2 flex justify-center items-center" }, [
  /* @__PURE__ */ createBaseVNode("img", { src: _imports_3 })
], -1);
const _hoisted_15 = {
  for: "my-modal",
  style: { "cursor": "pointer" }
};
const _hoisted_16 = ["href"];
const _hoisted_17 = /* @__PURE__ */ createBaseVNode("div", { class: "mr-2 flex justify-center items-center" }, [
  /* @__PURE__ */ createBaseVNode("img", { src: _imports_4 })
], -1);
const _hoisted_18 = /* @__PURE__ */ createBaseVNode("div", { class: "border-b-1 border-white" }, [
  /* @__PURE__ */ createBaseVNode("span", { class: "text-grey-200" }, "\u535A\u5BA2\u94FE\u63A5")
], -1);
const _hoisted_19 = [
  _hoisted_17,
  _hoisted_18
];
const _hoisted_20 = ["href"];
const _hoisted_21 = /* @__PURE__ */ createBaseVNode("div", { class: "mr-2 flex justify-center items-center" }, [
  /* @__PURE__ */ createBaseVNode("img", { src: _imports_4 })
], -1);
const _hoisted_22 = /* @__PURE__ */ createBaseVNode("div", { class: "border-b-1 border-white" }, [
  /* @__PURE__ */ createBaseVNode("span", { class: "text-grey-200" }, "Github")
], -1);
const _hoisted_23 = [
  _hoisted_21,
  _hoisted_22
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
    const { userInfo } = props;
    let copyText = (text) => [
      copyToClipboard(text)
    ];
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g;
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1$8,
        createBaseVNode("div", _hoisted_2$7, [
          createBaseVNode("div", _hoisted_3$7, [
            _hoisted_4$5,
            createBaseVNode("div", _hoisted_5$2, [
              createBaseVNode("h1", _hoisted_6$2, toDisplayString((_a = unref(userInfo)) == null ? void 0 : _a.name), 1),
              createBaseVNode("div", _hoisted_7$2, toDisplayString((_b = unref(userInfo)) == null ? void 0 : _b.job), 1)
            ])
          ]),
          _hoisted_8$2,
          createBaseVNode("div", _hoisted_9$2, [
            createBaseVNode("div", {
              class: "my-5 text-lg flex",
              onClick: _cache[0] || (_cache[0] = ($event) => {
                var _a2;
                return unref(copyText)(((_a2 = unref(userInfo)) == null ? void 0 : _a2.wechat) || "");
              })
            }, [
              _hoisted_10$2,
              createBaseVNode("label", _hoisted_11$2, toDisplayString((_c = unref(userInfo)) == null ? void 0 : _c.wechat), 1)
            ]),
            createBaseVNode("div", {
              class: "my-5 text-lg flex",
              onClick: _cache[1] || (_cache[1] = ($event) => {
                var _a2;
                return unref(copyText)(((_a2 = unref(userInfo)) == null ? void 0 : _a2.phone) || "");
              })
            }, [
              _hoisted_12$2,
              createBaseVNode("label", _hoisted_13$2, toDisplayString((_d = unref(userInfo)) == null ? void 0 : _d.phone), 1)
            ]),
            createBaseVNode("div", {
              class: "my-5 text-lg flex",
              onClick: _cache[2] || (_cache[2] = ($event) => {
                var _a2;
                return unref(copyText)(((_a2 = unref(userInfo)) == null ? void 0 : _a2.email) || "");
              })
            }, [
              _hoisted_14$2,
              createBaseVNode("label", _hoisted_15, toDisplayString((_e = unref(userInfo)) == null ? void 0 : _e.email), 1)
            ]),
            createBaseVNode("a", {
              href: (_f = unref(userInfo)) == null ? void 0 : _f.blogUrl,
              class: "my-5 flex",
              target: "_blank"
            }, _hoisted_19, 8, _hoisted_16),
            createBaseVNode("a", {
              href: (_g = unref(userInfo)) == null ? void 0 : _g.githubUrl,
              class: "my-5 flex",
              target: "_blank"
            }, _hoisted_23, 8, _hoisted_20)
          ])
        ])
      ], 64);
    };
  }
});
const _hoisted_1$7 = { class: "mx-4 mb-6" };
const _hoisted_2$6 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u4E2A\u4EBA\u4F18\u52BF", -1);
const _hoisted_3$6 = /* @__PURE__ */ createBaseVNode("span", { class: "iconfont icon-pointer mr-2" }, null, -1);
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
        _hoisted_2$6,
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.features, (feature) => {
          return openBlock(), createElementBlock("p", {
            class: "text-md",
            key: feature
          }, [
            _hoisted_3$6,
            createTextVNode(" " + toDisplayString(feature), 1)
          ]);
        }), 128))
      ]);
    };
  }
});
const _sfc_main$6 = {};
const _hoisted_1$6 = { class: "mx-4 mb-6" };
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u6559\u80B2\u7ECF\u5386", -1);
const _hoisted_3$5 = /* @__PURE__ */ createBaseVNode("div", { class: "flex justify-between text-xl" }, [
  /* @__PURE__ */ createBaseVNode("text", null, "\u91CD\u5E86\u5927\u5B66"),
  /* @__PURE__ */ createBaseVNode("text", null, "\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66"),
  /* @__PURE__ */ createBaseVNode("text", null, "2020-2024")
], -1);
const _hoisted_4$4 = [
  _hoisted_2$5,
  _hoisted_3$5
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$6, _hoisted_4$4);
}
const Education = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render]]);
const _hoisted_1$5 = { class: "mx-4" };
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-8 text-3xl text-gray-700 font-bold" }, "\u6280\u672F\u6808", -1);
const _hoisted_3$4 = { class: "flex flex-wrap" };
const _hoisted_4$3 = { class: "mr-2 my-1 rounded-full border px-4 text-sm py-2 font-medium bg-gray-200 hover:text-white duration-300 hover:bg-my-green hover:cursor-pointer skill" };
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
        _hoisted_2$4,
        createBaseVNode("ul", _hoisted_3$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.skills, (skill) => {
            return openBlock(), createElementBlock("li", {
              class: "mb-6",
              key: skill
            }, [
              createBaseVNode("div", null, [
                createBaseVNode("span", _hoisted_4$3, toDisplayString(skill), 1)
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const _hoisted_1$4 = { class: "mx-4 mb-6" };
const _hoisted_2$3 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u83B7\u5956\u7ECF\u5386", -1);
const _hoisted_3$3 = /* @__PURE__ */ createBaseVNode("span", { class: "iconfont icon-pointer mr-2" }, null, -1);
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
        _hoisted_2$3,
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.prizes, (item) => {
          return openBlock(), createElementBlock("div", { key: item }, [
            _hoisted_3$3,
            createBaseVNode("text", null, toDisplayString(item), 1)
          ]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$3 = { class: "mx-4 mb-6" };
const _hoisted_2$2 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u9879\u76EE\u7ECF\u5386", -1);
const _hoisted_3$2 = { class: "text-3xl font-medium text-gray-800" };
const _hoisted_4$2 = {
  class: "flex text-xl font-medium text-gray-800 justify-between",
  style: { "align-items": "center" }
};
const _hoisted_5$1 = { class: "text-md" };
const _hoisted_6$1 = { class: "mt-1" };
const _hoisted_7$1 = /* @__PURE__ */ createBaseVNode("text", { class: "mr-4 font-semibold" }, "\u9879\u76EE\u4ECB\u7ECD:", -1);
const _hoisted_8$1 = /* @__PURE__ */ createBaseVNode("p", { class: "mr-4 font-semibold" }, "\u6211\u7684\u5DE5\u4F5C:", -1);
const _hoisted_9$1 = /* @__PURE__ */ createBaseVNode("span", { class: "iconfont icon-pointer mr-2" }, null, -1);
const _hoisted_10$1 = { class: "flex justify-between" };
const _hoisted_11$1 = /* @__PURE__ */ createBaseVNode("text", { class: "mr-4 font-semibold" }, "\u6280\u672F\u6808:", -1);
const _hoisted_12$1 = ["href"];
const _hoisted_13$1 = /* @__PURE__ */ createBaseVNode("span", { class: "font-semibold border-b-2 border-solid border-gray-800 shadow-sm hover:font-bold hover:cursor-pointer" }, " \u4E86\u89E3\u66F4\u591A ", -1);
const _hoisted_14$1 = [
  _hoisted_13$1
];
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
        _hoisted_2$2,
        createBaseVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.experience, (item) => {
            return openBlock(), createElementBlock("li", {
              class: "mb-4",
              key: JSON.stringify(item)
            }, [
              createBaseVNode("text", _hoisted_3$2, toDisplayString(item.company), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(item.projects, (project) => {
                return openBlock(), createElementBlock("div", {
                  class: "mb-2",
                  key: project.name
                }, [
                  createBaseVNode("div", _hoisted_4$2, [
                    createBaseVNode("text", null, toDisplayString(project.name), 1),
                    createBaseVNode("text", null, toDisplayString(project.job), 1),
                    createBaseVNode("text", null, toDisplayString(project.time), 1)
                  ]),
                  createBaseVNode("div", _hoisted_5$1, [
                    createBaseVNode("div", _hoisted_6$1, [
                      _hoisted_7$1,
                      createBaseVNode("text", null, toDisplayString(project.introduce), 1)
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_8$1,
                      (openBlock(true), createElementBlock(Fragment, null, renderList(project.myContribution, (item2) => {
                        return openBlock(), createElementBlock("div", { key: item2 }, [
                          _hoisted_9$1,
                          createBaseVNode("text", null, toDisplayString(item2), 1)
                        ]);
                      }), 128))
                    ]),
                    createBaseVNode("div", _hoisted_10$1, [
                      createBaseVNode("div", null, [
                        _hoisted_11$1,
                        createBaseVNode("text", null, toDisplayString(project.skills), 1)
                      ]),
                      createBaseVNode("a", {
                        href: project.more,
                        target: "_blank"
                      }, _hoisted_14$1, 8, _hoisted_12$1)
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
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("h1", { class: "mb-4 text-3xl text-gray-700 font-bold" }, "\u5B9E\u4E60\u7ECF\u5386", -1);
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("div", { class: "mb-2 flex" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    alt: "",
    class: "ml-2 w-10"
  })
], -1);
const _hoisted_4$1 = {
  class: "flex text-xl font-medium text-gray-800 justify-between",
  style: { "align-items": "center" }
};
const _hoisted_5 = { class: "text-md" };
const _hoisted_6 = { class: "mt-1" };
const _hoisted_7 = /* @__PURE__ */ createBaseVNode("text", { class: "mr-4 font-semibold" }, "\u9879\u76EE\u4ECB\u7ECD:", -1);
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("p", { class: "mr-4 font-semibold" }, "\u6211\u7684\u5DE5\u4F5C:", -1);
const _hoisted_9 = /* @__PURE__ */ createBaseVNode("span", { class: "iconfont icon-pointer mr-2" }, null, -1);
const _hoisted_10 = { class: "flex justify-between" };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("text", { class: "mr-4 font-semibold" }, "\u6280\u672F\u6808:", -1);
const _hoisted_12 = ["href"];
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("span", { class: "font-semibold border-b-2 border-solid border-gray-800 shadow-sm hover:font-bold hover:cursor-pointer" }, " \u4E86\u89E3\u66F4\u591A ", -1);
const _hoisted_14 = [
  _hoisted_13
];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    internship: {
      type: []
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _hoisted_2$1,
        createBaseVNode("ul", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.internship, (item) => {
            return openBlock(), createElementBlock("li", {
              class: "mb-4",
              key: JSON.stringify(item.projects)
            }, [
              _hoisted_3$1,
              (openBlock(true), createElementBlock(Fragment, null, renderList(item.projects, (project) => {
                return openBlock(), createElementBlock("div", {
                  class: "mb-2",
                  key: project.name
                }, [
                  createBaseVNode("div", _hoisted_4$1, [
                    createBaseVNode("text", null, toDisplayString(project.name), 1),
                    createBaseVNode("text", null, toDisplayString(project.job), 1),
                    createBaseVNode("text", null, toDisplayString(project.time), 1)
                  ]),
                  createBaseVNode("div", _hoisted_5, [
                    createBaseVNode("div", _hoisted_6, [
                      _hoisted_7,
                      createBaseVNode("text", null, toDisplayString(project.introduce), 1)
                    ]),
                    createBaseVNode("div", null, [
                      _hoisted_8,
                      (openBlock(true), createElementBlock(Fragment, null, renderList(project.myContribution, (item2) => {
                        return openBlock(), createElementBlock("div", { key: item2 }, [
                          _hoisted_9,
                          createBaseVNode("text", null, toDisplayString(item2), 1)
                        ]);
                      }), 128))
                    ]),
                    createBaseVNode("div", _hoisted_10, [
                      createBaseVNode("div", null, [
                        _hoisted_11,
                        createBaseVNode("text", null, toDisplayString(project.skills), 1)
                      ]),
                      createBaseVNode("a", {
                        href: project.more,
                        target: "_blank"
                      }, _hoisted_14, 8, _hoisted_12)
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
const _hoisted_1$1 = {
  class: "p-4 h-full shadow-2xl",
  style: { "border-radius": "1rem" }
};
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
        createVNode(_sfc_main$3, { project: __props.experience }, null, 8, ["project"]),
        createVNode(_sfc_main$2, { internship: __props.internship }, null, 8, ["internship"]),
        createVNode(_sfc_main$4, { prizes: __props.prizes }, null, 8, ["prizes"]),
        createVNode(_sfc_main$5, { skills: __props.skills }, null, 8, ["skills"])
      ]);
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_516e1384_lang = "";
const Main = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-516e1384"]]);
const _hoisted_1 = {
  id: "home",
  style: { "background-color": "#FFF" }
};
const _hoisted_2 = { class: "max-w-screen-lg mx-auto md:flex" };
const _hoisted_3 = { class: "md:w-1/3 p-4 relative" };
const _hoisted_4 = { class: "md:w-2/3 p-4 w-full" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const userInfo = {
      name: "\u8BF8\u5609\u8BDA",
      job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
      email: "2253541907@qq.com",
      phone: "15023092023",
      wechat: "zaqwertyuioplm7412",
      blogUrl: "https://jiacheng-coder.github.io/my-blog",
      githubUrl: "https://github.com/jiacheng-coder"
    };
    const skills = [
      "Vue2",
      "Vue3",
      "Vue Router",
      "Pinia",
      "React",
      "Mobx",
      "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F",
      "Uniapp",
      "TailwindCSS",
      "DaisyUI",
      "GraceUI"
    ];
    const features = [
      "\u719F\u6089HTML,CSS,JS, \u719F\u6089W3C\u6807\u51C6\u4E0EECMA\u89C4\u8303, \u5BF9Typescript\u6709\u4E00\u5B9A\u4E86\u89E3",
      "\u719F\u6089Vue, VueRouter, Pinia, Vitepress\u7B49Vue\u751F\u6001, \u4E86\u89E3\u524D\u7AEF\u5DE5\u7A0B\u5316, \u80FD\u591F\u7ED3\u5408\u5DF2\u6709\u57FA\u7840\u8BBE\u65BD\u5FEB\u901F\u7814\u53D1\u9879\u76EE",
      "\u719F\u6089\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u7684\u5F00\u53D1\u4E0A\u7EBF\u6D41\u7A0B, \u62E5\u6709\u5355\u65E5\u7D2F\u8BA1\u6253\u5F00\u6B21\u657010\u4E07+\u5C0F\u7A0B\u5E8F\u7684\u5F00\u53D1\u7EF4\u62A4\u7ECF\u9A8C, \u80FD\u591F\u6839\u636E\u540E\u7AEF\u63A5\u53E3\u5FEB\u901F\u5B8C\u6210\u9875\u9762\u642D\u5EFA",
      "\u6709\u4E00\u5B9A\u7684\u524D\u7AEF\u8C03\u8BD5\u4E0E\u4F18\u5316\u80FD\u529B, \u4F8B\u5982\u5229\u7528\u8C03\u8BD5\u5DE5\u5177\u5FEB\u901F\u5B9A\u4F4D\u95EE\u9898, \u4EE5\u53CA\u901A\u8FC7\u53D8\u91CF\u52A0\u9501\u9632\u6B62\u591A\u6B21\u8BF7\u6C42\u51CF\u8F7B\u670D\u52A1\u7AEF\u538B\u529B\u7B49",
      "\u719F\u6089ColorUI, GraceUI, TailwindCSS\u7B49\u7EC4\u4EF6\u5E93, \u5E76\u80FD\u591F\u9488\u5BF9\u5177\u4F53\u4E1A\u52A1\u5BF9\u7EC4\u4EF6\u5E93\u8FDB\u884C\u7B80\u5355\u7684\u4E8C\u6B21\u5F00\u53D1",
      "\u6709\u5199\u535A\u5BA2\u7684\u4E60\u60EF, \u5173\u6CE8\u7528\u6237\u4F53\u9A8C, \u6CE8\u91CD\u6280\u672F\u79EF\u7D2F\u4E0E\u65B0\u6280\u672F\u7684\u63A2\u7D22"
    ];
    const experience = [
      {
        company: "\u91CD\u5E86\u7535\u8986\u8005\u79D1\u6280\u6709\u9650\u516C\u53F8",
        projects: [
          {
            name: "WeCQU\u5C0F\u7A0B\u5E8F",
            job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
            time: "2022.9 - 2023.8",
            introduce: "\u9762\u5411\u5927\u5B66\u751F\u5F00\u53D1\u7684\u6821\u56ED\u4E00\u4F53\u5316\u67E5\u8BE2\u5C0F\u7A0B\u5E8F, \u5355\u65E5\u7D2F\u8BA1\u6253\u5F00\u6B21\u657010\u4E07+",
            myContribution: [
              "\u7ED3\u5408\u540E\u7AEF\u63A5\u53E3\u6570\u636E, \u4F7F\u7528GraceUI\u7EC4\u4EF6\u5E93\u8FDB\u884C\u6570\u636E\u6E32\u67D3",
              "\u91CD\u6784\u9875\u9762UI, \u7B80\u5316\u539F\u6709JS\u903B\u8F91, \u603B\u91CD\u6784\u7387\u7EA6\u8FBE50%",
              "\u5BF9\u7EC4\u4EF6\u5E93\u4E2D\u7684\u8F6E\u64AD\u56FE\u7EC4\u4EF6\u8FDB\u884C\u4E8C\u6B21\u5C01\u88C5, \u5B9E\u73B0\u70B9\u51FB\u8DF3\u8F6Cwebview\u516C\u4F17\u53F7\u63A8\u6587\u7684\u529F\u80FD",
              "\u4F7F\u7528promise\u5C01\u88C5wx.request\u548Cwx.showModal\u8BF7\u6C42",
              "\u901A\u8FC7\u9632\u6296\u9632\u6B62\u53D1\u8D77\u4E8C\u6B21\u767B\u5F55\u8BF7\u6C42,\u51CF\u8F7B\u670D\u52A1\u5668\u538B\u529B",
              "\u901A\u8FC7setStorage\u5B9E\u73B0\u6570\u636E\u6301\u4E45\u5316,\u5305\u62EC\u7528\u6237\u5934\u50CF\u4E0E\u8BFE\u8868\u4FE1\u606F\u7684\u5B58\u50A8\u7B49"
            ],
            skills: "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F, ColorUI, GraceUI3",
            more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/Wecqu.html"
          },
          {
            name: "\u751F\u6001\u5708\u6821\u56ED\u8BBA\u575B",
            job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
            time: "2022\u5E7412\u6708 - \u81F3\u4ECA",
            introduce: "\u57FA\u4E8EUniapp\u5F00\u53D1\u7684\u9AD8\u6821\u8BBA\u575B\u7C7BH5\u7F51\u9875, \u5F71\u54CD\u529B\u6DB5\u76D6\u591A\u6240\u9AD8\u6821",
            myContribution: [
              "\u57FA\u4E8EGraceUI\u7EC4\u4EF6\u5E93\u7ED3\u5408\u8BBE\u8BA1\u7A3F\u8FDB\u884C\u9875\u9762UI\u7684\u7ED8\u5236",
              "\u4F7F\u7528vue\u7684component\u7EC4\u4EF6\u63D0\u5347\u9875\u9762\u6E32\u67D3\u6548\u7387",
              "\u57FA\u4E8E\u5355\u4F8B\u6A21\u5F0F\u7684\u601D\u60F3, \u4F7F\u7528Vuex\u8FDB\u884C\u5168\u5C40\u72B6\u6001\u7BA1\u7406, \u7EDF\u4E00\u66B4\u9732\u63A5\u53E3\u5BF9\u5168\u5C40\u6570\u636E\u8FDB\u884CCRUD",
              "\u901A\u8FC7watch\u76D1\u542C\u5668\u4E0EVuex\u7684getters\u89E3\u51B3\u4E86\u6D88\u606F\u63D0\u9192\u7684\u7EA2\u70B9\u903B\u8F91\u95EE\u9898"
            ],
            skills: "Uniapp, GraceUI5",
            more: "https://zhujiacheng612.gitee.io/blog/07.%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D/ecosystem.html"
          }
        ]
      }
    ];
    const internship = [
      {
        company: "\u7F8E\u56E2",
        icon: "@assets/icons/favicon-mt.ico",
        projects: [
          {
            name: "\u97E6\u6069\u7CFB\u7EDF",
            job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
            time: "2023.6 - \u81F3\u4ECA",
            introduce: "\u8FD0\u8425\u63D0\u6548\u7684 M \u7AEF\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u7F8E\u56E2\u5230\u5BB6\u4E1A\u52A1",
            myContribution: [],
            skills: "React18, React Hooks, Webpack5",
            more: ""
          },
          {
            name: "\u7EDF\u4E00\u62DB\u5546\u5E73\u53F0",
            job: "\u524D\u7AEF\u5F00\u53D1\u5DE5\u7A0B\u5E08",
            time: "2023.6 - \u81F3\u4ECA",
            introduce: "\u8FD0\u8425\u63D0\u6548\u7684 M \u7AEF\u7CFB\u7EDF\uFF0C\u7528\u4E8E\u7F8E\u56E2\u5230\u5BB6\u4E1A\u52A1",
            myContribution: [],
            skills: "React18, React Hooks, Webpack5, Vite, Monorepo",
            more: ""
          }
        ]
      }
    ];
    const prizes = [
      "\u7B2C\u56DB\u5C4A-\u5B57\u8282\u8DF3\u52A8-\u524D\u7AEF\u9752\u8BAD\u8425-\u7801\u5982\u78D0\u77F3\u5956",
      "2021\u5E74\u5168\u56FD\u5927\u5B66\u751F\u6570\u5B66\u7ADE\u8D5B-\u91CD\u5E86\u8D5B\u533A-\u7701\u7EA7\u4E09\u7B49\u5956"
    ];
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_sfc_main$8, { userInfo })
          ]),
          createBaseVNode("div", _hoisted_4, [
            createVNode(Main, {
              skills,
              features,
              experience,
              prizes,
              internship
            })
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
