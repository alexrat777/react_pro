import { rtkApi as rtkApi1 } from '@/shared/api/rtkAPI';
import { FeatureFlags } from '@/shared/types/featureFlags';

interface UpdateFeatureFlagsOptions {
    userId: string;
    features: Partial<FeatureFlags>; // Partial обновляем не все а кусочек конкретные фичи
}

const featureFlagsApi = rtkApi1.injectEndpoints({
    endpoints: (build) => ({
        updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    features,
                },
            }),
        }),
    }),
});

export const updateFeatureFlagsMutation =
    featureFlagsApi.endpoints.updateFeatureFlags.initiate;
