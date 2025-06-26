<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <base-card>
            <section>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches(true)">refresh</base-button>
                    <base-button v-if="!isLoggedin" to="/auth?redirect=register" link>Login to register as a coach</base-button>
                    <base-button link to="/register" v-if="isLoggedin && !isCoach && !isLoading">register as a
                        coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
                    <coach-items v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id"
                        :first-name="coach.firstName" :last-name="coach.lastName" :rate="coach.hourlyRate"
                        :areas="coach.areas">
                    </coach-items>
                </ul>
                <h3 v-else>coaches not found</h3>
            </section>
        </base-card>
    </div>
</template>

<script>
    import CoachItems from "../../components/coaches/CoachItems.vue";
    import CoachFilter from "../../components/coaches/CoachFilter.vue";
    export default {
        data() {
            return {
                isLoading: false,
                error: null,
                activeFilters: {
                    frontend: true,
                    backend: true,
                    career: true,
                }
            };
        },
        components: {
            CoachItems,
            CoachFilter
        },
        computed: {
            isLoggedin() {
                return this.$store.getters.isAuthenticated
            },
            filteredCoaches() {
                const coaches = this.$store.getters['coaches/coaches'];
                return coaches.filter((coach) => {
                    if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                        return true;
                    }
                    if (this.activeFilters.backend && coach.areas.includes('backend')) {
                        return true;
                    }
                    if (this.activeFilters.career && coach.areas.includes('career')) {
                        return true;
                    }
                    return false;
                });
            },
            hasCoaches() {
                return !this.isLoading && this.$store.getters['coaches/hasCoaches']
            },
            isCoach() {
                return this.$store.getters['coaches/isCoach']
            }
        },
        created() {
            this.loadCoaches()
        },
        methods: {
            setFilters(updatedFilters) {
                this.activeFilters = updatedFilters
            },
            async loadCoaches(refresh = false) {
                this.isLoading = true
                try {
                    await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh })
                } catch (error) {
                    this.error = error.message || 'Something went wrong!'
                }
                this.isLoading = false
            },
            handleError() {
                this.error = null
            }
        }
    }
</script>


<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .controls {
        display: flex;
        justify-content: space-between;
    }
</style>