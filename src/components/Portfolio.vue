<template>
  <div>
    <section class="portfolio" id="portfolio">
    <div class="container text-center">
      <h2>
          Portfolio {{ $store.getters.imagesLength }} images
        </h2>
        You can put a sample image link here
        <!-- <input type="text" class="form-control" v-model="imgSrc"> <button @click="addImage">Insert</button> -->
      </p>
    </div>
    <div class="portfolio-grid">
          <div class="row">
            <div class="col-lg-3 col-sm-6 col-xs-12" v-for="image in $store.state.images" :key="image.id">
              <div class="card card-block stretch">
                <a href="#" class="stretch"><img class="stretch" alt="" :src="image.url">
                  <div class="portfolio-over">
                    <div>
                      <h3 class="card-title">
                        {{ image.title }}
                      </h3>

                      <p class="card-text">
                         {{ image.thumbnailUrl }}
                      </p>
                  </div>
                </div></a>
            </div>
          </div>
        </div
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  name: 'portofio',
  data () {
    return {
      imgSrc: null
    }
  },
  methods: {
    addImage () {
      if (this.imgSrc) {
        this.$store.dispatch('insertImage', { src: this.imgSrc })
        this.imgSrc = null
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
