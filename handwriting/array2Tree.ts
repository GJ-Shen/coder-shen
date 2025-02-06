// 关键字： 复用对象引用缓存节点关系
function arrayToTree(data: { id: string; parentId: string | null; [key: string]: any } []) {
    const map: {[key: string]: any} = {};
    const result: any[] = [];
  
    // 1. 遍历数据，将每个节点以 id 为键存储到 map 中
    data.forEach(item => {
      map[item.id] = { ...item, children: [] };
    });
  
    // 2. 遍历数据，将每个节点挂载到其父节点的 children 数组中
    data.forEach(item => {
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