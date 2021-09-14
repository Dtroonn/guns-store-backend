import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/",
    withCredentials: true,
});

export const categoriesApi = {
    async get() {
        return axiosInstance.get("categories");
    },
};

export const filtersApi = {
    async get(category, search) {
        return axiosInstance.get(
            `filters/${category ? category : ""}${search ? `?search=${search}` : ""}`,
        );
    },
};

export const productsApi = {
    async get(category, page, count, sortBy, activeFilters, search) {
        const { types, kinds, isSale, price } = activeFilters;
        const categoryQuery = category ? `category=${category}` : "";
        const pageQuery = `page=${page}`;
        const countQuery = `count=${count}`;
        const sortQuery = `sort=${sortBy}`;
        const saleQuery = `sale=${isSale}`;
        const typeQuery = types.length ? `type=${types.join(",")}` : "";
        const kindQuery = kinds.length ? `kind=${kinds.join(",")}` : "";
        const priceQuery = Object.keys(price).length ? `price=${price.min},${price.max}` : "";
        const searchQuery = search ? `search=${search}` : "";
        return axiosInstance.get(
            "products?" +
                `&${categoryQuery}` +
                `&${pageQuery}` +
                `&${countQuery}` +
                `&${sortQuery}` +
                `&${saleQuery}` +
                `&${typeQuery}` +
                `&${kindQuery}` +
                `&${priceQuery}` +
                `&${searchQuery}`,
        );
    },
};

export const favoritesApi = {
    async get() {
        return axiosInstance.get("favorites");
    },

    async add(id) {
        return axiosInstance.post(`favorites/${id}`);
    },

    async remove(id) {
        return axiosInstance.delete(`favorites/${id}`);
    },

    async clear() {
        return axiosInstance.delete("favorites");
    },
};

export const cartApi = {
    async get() {
        return axiosInstance.get("cart");
    },

    async add(id, count) {
        return axiosInstance.post(`cart/${id}`, {
            count,
        });
    },

    async remove(id) {
        return axiosInstance.delete(`cart/${id}`);
    },

    async clear() {},
};

export const receiOptionsApi = {
    async get() {
        return axiosInstance.get("recei-options");
    },

    async add(id, count) {},
};

export const payOptionsApi = {
    async get() {
        return axiosInstance.get("pay-options");
    },

    async add(id, count) {},
};

export const ordersApi = {
    async add(data) {
        return axiosInstance.post("orders", data);
    },
};
