import apiSlice from "../../app/apiSlice"

const managerApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addNewProd: build.mutation({
            query: (registerUser) => ({
                url: "/api/product",
                method: "POST",
                body: registerUser
            }),
            invalidatesTags:["MangProd"]
        }),

        deleteProd: build.mutation({
            query: (id) => ({
                url: "/api/product/"+id,
                method: "DELETE"
            }),
            invalidatesTags:["MangProd"]
        }),
        
        updateProd: build.mutation({
            query: (product) => ({
                url: "/api/product",
                method: "PUT",
                body: product
            }),
            invalidatesTags:["MangProd"]
        }),
        getAllProd: build.query({
            query: () => ({
                url: "/api/product",
                method: "GET",
            }),
            providesTags:["MangProd"]
           
        }),
        
        getAllCategories: build.query({
            query: () => ({
                url: "/api/category",
                method: "GET",
            }),
            invalidatesTags:["MangProd"]
        }),
        getProdWithCategoryName: build.query({
            query: () => ({
                url: "/api/product/withCategoryName",
                method: "GET",
            })
        })
        
    })
})
export const { useGetProdWithCategoryNameQuery,useGetAllCategoriesQuery,useAddNewProdMutation, useGetAllProdQuery ,useDeleteProdMutation,useUpdateProdMutation} = managerApiSlice