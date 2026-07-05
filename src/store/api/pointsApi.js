import {apiSlice} from "../slice/apiSlice";

export const pointsApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPoints: build.query({
            query: () => ({
                url: '/points',
                method: 'GET'
            }),
            providesTags: ['Points']
        }),
        addPoint: build.mutation({
            query: (coordinates) => ({
                url: '/points',
                method: 'POST',
                body: {...coordinates}
            }),
            async onQueryStarted(coordinates, { dispatch, queryFulfilled }) {
                try {
                    const { data: newPoint } = await queryFulfilled;
                    
                    dispatch(
                        pointsApi.util.updateQueryData('getPoints', undefined, (draft) => {

                            if (!Array.isArray(draft)) {
                                console.warn("Кэш не найден или не является массивом, точка добавится только после перезагрузки");
                                return;
                            }

                            draft.unshift(newPoint);
                            console.log(`Точка добавлена в кэш. Новая длина: ${draft.length}`);
                        })
                    );
                } catch (error) {
                    console.error("Ошибка запроса /points:", error);

                }
            }
        })
    })
});
export const {
    useGetPointsQuery,
    useAddPointMutation
} = pointsApi;