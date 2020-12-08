// 商品品种 option data
export const optionParent = {
  height: 'auto',
  calcHeight: 95,
  tip: false,
  searchShow: true,
  searchMenuSpan: 10,
  tree: true,
  border: true,
  index: true,
  viewBtn: true,
  dialogWidth: 880,
  delBtn: false, // 行内删除
  addBtn: false, // 新增
  selection: false, // 去除选择
  dialogClickModal: false,
  column: [{
    label: '品种编号',
    prop: 'code',
    search: true,
    searchSpan: 7,
    span: 24,
    rules: [{
      required: true,
      message: '请输入品种编号',
      trigger: 'blur',
    }],
  },
  {
    label: '品种名称',
    prop: 'name',
    search: true,
    searchSpan: 7,
    align: 'center',
    rules: [{
      required: true,
      message: '请输入品种名称',
      trigger: 'blur',
    }],
  },
  ],
};

export const optionChild = {
  height: 'auto',
  calcHeight: 95,
  tip: false,
  searchShow: true,
  searchMenuSpan: 10,
  tree: true,
  border: true,
  index: true,
  viewBtn: true,
  dialogWidth: 880,
  dialogClickModal: false,
  delBtn: false, // 行内删除
  addBtn: false, // 新增
  selection: false, // 去除选择
  column: [{
    label: '品种编号',
    prop: 'code',
    addDisabled: true,
    editDisabled: true,
    search: true,
    searchSpan: 7,
    span: 24,
    rules: [{
      required: true,
      message: '请输入品种编号',
      trigger: 'blur',
    }],
  },
  {
    label: '品种名称',
    prop: 'name',
    search: true,
    searchSpan: 7,
    align: 'center',
    rules: [{
      required: true,
      message: '请输入品种名称',
      trigger: 'blur',
    }],
  },
  ],
};
