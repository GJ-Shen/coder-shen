// 关键字： 复用对象引用缓存节点关系
function array2tree(
  data: { id: string; parentId: string | null; [key: string]: any }[],
) {
  const result: any[] = [];

  // 1. 遍历数据，将每个节点以 id 为键存储到 map 中
  const map = data.reduce((prev, next) => {
    return {
      ...prev,
      [next.id]: { ...next, children: [] },
    };
  }, {});

  // 2. 遍历数据，将每个节点挂载到其父节点的 children 数组中
  data.forEach((item) => {
    if (item.parentId === null) {
      // 根节点直接添加到结果中
      result.push(map[item.id]);
    } else {
      // 非根节点将自己添加到父节点的 children 数组
      if (map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]);
      }
    }
  });

  return result;
}

function tree2array(data: { id: string; name: string; children: any[] }[]) {
  const result: any[] = [];
  data.forEach((item) => {
    result.push(item);
    if (item.children?.length) {
      const childTree = tree2array(item.children);
      result.push(...childTree);
    }
  });
  return result;
}
