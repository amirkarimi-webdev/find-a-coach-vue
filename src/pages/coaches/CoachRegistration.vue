<template>
    <base-card>
        <h2>Register as a coach now!</h2>
        <coach-forms @save-data="saveData"></coach-forms>
    </base-card>
</template>

<script>
    import CoachForms from '../../components/coaches/CoachForms.vue'
    export default {
        components: {
            CoachForms
        },
        methods: {
            saveData(data) {
                this.$store.dispatch('coaches/registerCoach', data)
                this.$router.replace('/coaches')
            }
        },

    }
</script>