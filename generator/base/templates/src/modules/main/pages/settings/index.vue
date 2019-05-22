<template>
  <section class="home">
    <div class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Settings
          </h1>
          <h2 class="subtitle">
            Import / Export data
          </h2>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="content">

          <h1 class="title">Import Data</h1>
          <div class="file">
            <label class="file-label">
              <input
                type="file"
                class="file-input"
                accept=".json"
                id="inputGroupFile01"
                @change="processFile($event)"
              >
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
          </div>

          <small class="text-success" v-if="imported && importValid">
            <i class="fa fa-check-circle"></i>
            Imports the {{importJson.label}} Blueprint with {{importJson.schemas.length}} models
          </small>

          <small class="text-danger" v-if="imported && !importValid">
            <i class="fa fa-times-circle"></i>
            Invalid blueprint format
          </small>

          <h1 class="title">Export Data</h1>
          <button class="button is-success" @click="exportData()">
            <i class="fa fa-fw fa-plus"></i>
            Export
          </button>

          <h1 class="title">Flush Data</h1>
          <button class="button is-danger" @click="flushData">
            <i class="fa fa-fw fa-plus"></i>
            Flush Data
          </button>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
const DownloadFile = require('downloadjs')

export default {
  name: 'Settings',
  metaInfo: {
    title: 'Settings'
  },
  data () {
    return {
      importJson: {},
      imported: false,
      importValid: false
    }
  },
  methods: {
    processFile (event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      // TODO - add a try/catch statement here
      reader.onload = (e) => {
        this.imported = true
        this.importJson = JSON.parse(e.target.result)
        if (Object.keys(this.importJson)[0]) {
          this.importValid = true
          window.localStorage.vuex = JSON.stringify(this.importJson)
          window.location = '/' // Sends back to home page
        }
      }
      reader.readAsText(file)
    },
    exportData() {
      const state = this.$store.state
      DownloadFile(JSON.stringify(state, null, 2), "<%= blueprint.identifier %>_export.json", 'application/json')
    },
    flushData() {
      delete window.localStorage.vuex // Flushes vuex state in localStorage
      window.location = '/' // Sends back to home page
    }
  }
}
</script>
