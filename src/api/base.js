const base={
  baseUrl:"http://localhost:4000",
  register:"/api/register",//注册
  login:"/api/login",//登录
  selectTbItemAllByPage:"/api/backend/item/selectTbItemAllByPage",//商品列表
  total:"/api/total",//商品总条数
  search:"/api/search",//模糊查询
  selectItemCategoryByParentId :"/api/backend/itemCategory/selectItemCategoryByParentId",//类目选择
  insertTbItem:"/api/backend/item/insertTbItem",//添加商品
  deleteItemById :"/api/backend/item/deleteItemById",//商品删除
  preUpdateItem :"/api/backend/item/preUpdateItem",//预更新接口
  updateTbItem:"/api/backend/item/updateTbItem",//商品编辑
  selectItemParamAll:"/api/backend/itemParam/selectItemParamAll",//规格参数查询
  paramsSearch:"/api/params/search",//规格参数模糊查询
  insertItemParam :"/api/backend/itemParam/insertItemParam",//规格参数添加
  paramsDelete:"/api/params/delete",//规格参数删除
  selectContentCategoryByParentId:"/api/content/selectContentCategoryByParentId",//广告管理查询
  insertContentCategory:"/api/content/insertContentCategory",//添加子导航
  updateContentCategory:"/api/content/updateContentCategory",//修改子导航
  deleteContentCategoryById:"/api/content/deleteContentCategoryById",//删除子导航
  insertTbContent: "/api/content/insertTbContent",//广告内容管理增加内容
  deleteContentByIds:"/api/content/deleteContentByIds",//广告管理删除内容
  contentlectTbContentAllByCategoryId:"/api/contentlectTbContentAllByCategoryId",//广告管理查询内容
}
export default base;