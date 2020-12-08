<template>
  <div></div>
</template>

<script>
export default {
  name: 'authredirect',
  created() {
    window.close()
    const params = this.$route.query
    const stateData = params.state
    const codeData = params.code
    window.opener.location.href = `${window.location.origin}/#/login?state=${stateData}&code=${codeData}`
  },
}
</script>
<style>
</style>
