// object-fit-type
export const OBJECT_FIT_TYPES = [
  {
    label: '同比缩放，不被裁剪',
    value: 'contain'
  },
  {
    label: '同比缩放，可能被裁减',
    value: 'cover'
  },
  {
    label: '填充整个容器，可能变形',
    value: 'fill'
  },
  {
    label: '保持原有图片长宽',
    value: 'none'
  },
  {
    label: '保持原有尺寸比例',
    value: 'scale-down'
  }
]

// background-size
export const BACKGROUND_SIZE = [
  {
    label: '自动',
    value: 'auto'
  },
  {
    label: '同比缩放，不被裁剪',
    value: 'contain'
  },
  {
    label: '同比缩放，可能被裁减',
    value: 'cover'
  }
]

// background-repeat
export const BACKGROUND_REPEAT = [
  {
    label: '不重复',
    value: 'no-repeat'
  },
  {
    label: '重复',
    value: 'repeat'
  },
  {
    label: 'X方向重复',
    value: 'repeat-x'
  },
  {
    label: 'Y方向重复',
    value: 'repeat-y'
  },
]

// background-position
export const BACKGROUND_POSITION = [
  {
    label: '左侧截取',
    value: 'left'
  },
  {
    label: '右侧截取',
    value: 'right'
  },
  {
    label: '上侧截取',
    value: 'top'
  },
  {
    label: '下侧截取',
    value: 'bottom'
  },
  {
    label: '中心截取',
    value: 'center'
  },
]
