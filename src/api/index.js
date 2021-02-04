import axios from '../utils/requires'
import base from './base'
const api ={
    register(params){
        return axios.post(base.baseUrl+base.register,params)
    },
    login(params){
        return axios.post(base.baseUrl+base.login,params)
    },
    /* 商品列表 */
    selectTbItemAllByPage(params){
        return axios.get(base.baseUrl+base.selectTbItemAllByPage,{
            params
        })
    },
    /* 分页总数 */
    total(){
        return axios.get(base.baseUrl+base.total)
    },
    /* 模糊查询 */
    search(params){
       return axios.get(base.baseUrl+base.search,{
           params
       })
    },
    //类目选择
    selectItemCategoryByParentId(params){
        return axios.get(base.baseUrl+base.selectItemCategoryByParentId,{
            params
        })
    },
    //商品添加
    insertTbItem(params){
        return axios.get(base.baseUrl+base.insertTbItem,{
            params
        })
    },
    //删除商品
    deleteItemById(params){
        return axios.get(base.baseUrl+base.deleteItemById,{
            params
        })
    },
    //预更新
    preUpdateItem(params){
        return axios.get(base.baseUrl+base.preUpdateItem,{
            params
        })
    },
    /***
     * 
     * 商品编辑
     */
    updateTbItem(params){
        return axios.get(base.baseUrl+base.updateTbItem,{
            params
        })
    },
    /***
     * 
     * 规格参数查询
     */
    selectItemParamAll(params){
        return axios.get(base.baseUrl+base.selectItemParamAll,{
            params
        })
    },
    /***
     * 
     * 规格参数模糊查询
     */
    paramsSearch(params){
        return axios.get(base.baseUrl+base.paramsSearch,{
            params
        })
    },
    insertItemParam(params){
        return axios.get(base.baseUrl+base.insertItemParam,{
            params
        })
    },
    paramsDelete(params){
      return axios.get(base.baseUrl+base.paramsDelete,{
          params
      })
    },
    selectContentCategoryByParentId(params){
        return axios.get(base.baseUrl+base.selectContentCategoryByParentId,{
            params
        })
    },
    insertContentCategory(params){
        return axios.get(base.baseUrl+base.insertContentCategory,{
            params
        })
    },
    updateContentCategory(params){
        return axios.get(base.baseUrl+base.updateContentCategory,{
            params
        })
    },
    deleteContentCategoryById(params){
        return axios.get(base.baseUrl+base.deleteContentCategoryById,{
            params
        })
    },
    insertTbContent(params){
        return axios.get(base.baseUrl+base.insertTbContent,{
            params
        })
    },
    deleteContentByIds(params){
        return axios.get(base.baseUrl+base.deleteContentByIds,{
            params
        })
    },
    contentlectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl+base.contentlectTbContentAllByCategoryId,{
            params
        })
    }


}
export default api;