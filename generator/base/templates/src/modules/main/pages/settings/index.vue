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

          <h2>Import Data</h2>
          <p class="is-size-6">
            Import a <code>.json</code> file containing your data.
          </p>
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

          <small class="text-success" v-if="importSuccess">
            <i class="fa fa-check-circle"></i>
            Successfully imported data
          </small>

          <small class="text-danger" v-if="importError">
            <i class="fa fa-times-times"></i>
            Error importing data
          </small>

          <h2>Export Data</h2>
          <p class="is-size-6">
            Export your data as a <code>.json</code> file.
          </p>
          <button class="button is-success" @click="exportData()">
            <i class="fa fa-fw fa-download"></i>
            Export
          </button>

          <h2>Flush Data</h2>
          <p class="is-size-6">
            Flush all the data and reload the app.
          </p>
          <button class="button is-danger" @click="flushData">
            <i class="fa fa-fw fa-trash-alt"></i>
            Flush Data
          </button>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
const DownloadFile = require('downloadjs')
const storeModules = [
  <%- helpers.indent(blueprint.schemas.map(s => `'${s.identifier}'`).join(',\n'), 2) %>
]

export default {
  name: 'Settings',
  metaInfo: {
    title: 'Settings'
  },
  data () {
    return {
      importSuccess: false,
      importError: false
    }
  },
  methods: {
    processFile (event) {
      // Resets the component's state
      this.importSuccess = false
      this.importError = false

      // Attempts to load the file from the <input type='file' />
      const file = event.target.files[0]
      const reader = new FileReader()

      // Wraps to catch any errors
      try {

        // Defines an onload callback for the file reader
        reader.onload = (e) => {

          // Attempt to parse file's contents as JSON
          // NOTE - this will throw an error if it's invalid
          const importedJson = JSON.parse(e.target.result)

          // Iterates over each storeModule, commits the changes to the store if data is defined
          storeModules.forEach(each => {
            if (importedJson[each] && Array.isArray(importedJson[each])) {
              this.$store.commit(`${each}/collection/items`, importedJson[each])
            }
          })

          // Assuming there's no error, indicate success
          this.importSuccess = true

          // Sends back to home page to refresh
          window.location = '/'
        }

        // Attempts to read the file as text
        reader.readAsText(file)

      // Handle import error
      } catch (e) {
        this.importSuccess = false
        this.importError = true
      }
    },
    exportData() {
      // Assmbles the data being exported
      const state = {}
      storeModules.forEach(each => state[each] = this.$store.state[each].collection.items)

      // Assembles the filename
      const filename = `<%= blueprint.identifier %>_export_${new Date().getTime()}.json`

      // Downloads the file
      DownloadFile(JSON.stringify(state, null, 2), filename, 'application/json')
    },
    flushData() {
      delete window.localStorage.vuex // Flushes vuex state in localStorage
      window.location = '/' // Sends back to home page
    }
  }
}
</script>

