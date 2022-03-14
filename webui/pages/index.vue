<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column title mb-6">{{ gameContentType }} Party Creator</div>
      </div>
      <form>
        <div class="columns">
          <div class="column">
            <b-field label="Select your availability (max 6)">
              <b-datepicker
                placeholder="Click to select..."
                v-model="dates"
                :min-date="yesterday"
                multiple>
              </b-datepicker>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Dungeon Name">
              <div class="select">
                <select v-model="dungeon" required>
                  <option>Demon Beast Canyon</option>
                  <option>Necromancer’s Origin</option>
                  <option>Hall of the Twisted Warlord</option>
                  <option>Hildebrandt Palace</option>
                  <option>Road of Lament</option>
                  <option>Forge of Fallen Pride</option>
                  <option>Sea of Indolence</option>
                  <option>Tranquil Karkosa</option>
                  <option>Alaric's Sanctuary</option>
                  <option>Aira's Oculus</option>
                  <option>Oreha Preveza</option>
                </select>
              </div>
            </b-field>
          </div>
        </div>
        <div class="columns" v-if="partyCode">
          <div class="column">
            <i>Copy & Paste the Party Code anywhere in the discord</i>
          </div>
        </div>
        <div class="columns" v-if="partyCode">
          <div class="column">
            <b>Party Code</b>
            <br style="margin-bottom: 5px">
            <code>LAPFC::{{ partyCode }}</code>
            <b-button type="is-success is-small" @click="copyCode" style="margin-top: -2px; margin-left: 5px">Copy</b-button>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <b-button type="is-primary mt-2" @click="checkFields">Generate</b-button>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
const axios = require('axios');
const { DateTime } = require("luxon");
function sortLuxonDates(a, b) {
  return a.toMillis() - b.toMillis()
}
import Card from '~/components/Card'

export default {
  name: 'IndexPage',
  components: {
    Card
  },
  data() {
    return {
      dates: [new Date(new Date().setDate(new Date().getDate()))],
      dungeon: "",
      yesterday: new Date(new Date().setDate(new Date().getDate()-1)),
      freshGen: true,
      pinataApiKey: "a6d4760b040abd97e3df",
      pinataSecretApiKey: "f025e388518b5cc60fed0b15a34d8e55d6f07a5801f0dd079f30ec3340da53b7",
      gameContentType: "Abyssal Dungeon",
      partyCode: ""
    }
  },
  watch: {
    dates: function (val) {
      if (val.length > 6)
      {
        val.pop()
      }
    }
  },
  computed: {
    formattedDates() {
      const dates = this.$data.dates
      let luxonDates = []
      let newDates = []
      dates.forEach(function (date) {
        luxonDates.push(DateTime.fromISO(date.toISOString()))
      })
      luxonDates.sort(sortLuxonDates)
      luxonDates.forEach(function (date) {
        newDates.push(date.toLocaleString(DateTime.DATE_SHORT))
      })
      return newDates
    }
  },
  methods: {
    submitData() {
      this.partyCode = ""
      const JSON = {
        "game content type": this.gameContentType,
        "game content name": this.dungeon,
        "dates": this.formattedDates
      }
      let self = this
      const pinJSONToIPFS = (pinataApiKey, pinataSecretApiKey, JSONBody, self) => {
        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
        return axios
          .post(url, JSONBody, {
            headers: {
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey
            }
          })
          .then(function (response) {
            self.$data.partyCode = response.data["IpfsHash"]
          })
          .catch(function (error) {
            self.$data.partyCode = `IPFS Pinata: ${error}. Please contact admin.`
          });
      }
      pinJSONToIPFS(this.pinataApiKey, this.pinataSecretApiKey, JSON, self)
    },
    checkFields() {
      let isValid = document.forms[0].reportValidity();
      if (!document.querySelectorAll('input')[0].value) {
        this.$data.freshGen = true
        this.$data.dates = [new Date(new Date().setDate(new Date().getDate()))]
      }
      if (isValid) {
        this.submitData()
      }
    },
    copyCode() {
      navigator.clipboard.writeText("LAPFC::"+this.partyCode)
    }
  },
  mounted() {
    let self = this
    document.querySelectorAll('input')[0].onclick = function () {
      if (self.$data.freshGen) {
        self.$data.freshGen = false
        self.$data.dates = []
      }
    }
  }
}
</script>
<style scoped>

</style>
