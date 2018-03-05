<template>
  <div>
    <section class="notes">
    <div class="container">
        <div class="row">
          <div class="col-md-4">
            <form @submit.prevent="saveNote">
              <div class="form-group">
                  <label for="category_id">Select Category</label>
                  <select name="category_id" class="form-control" v-model="note.category_id">
                    <option :value="category.id" v-for="category in categories">{{ category.name }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="form_note">Label </label>
                  <input type="text" class="" name="label"  required v-model="note.label">
                </div>
                <div class="form-group">
                  <label for="form_note">Notes </label>
                  <textarea class="form-control" name="description" rows="50" required v-model="note.description" style="min-height: 250px"></textarea>
                </div>
                <div class="form-group">
                  <button class="btn btn-default" type="submit">Save</button>
                </div>
            </form>
          </div>

           <div class="col-md-8">
             <div class="form-group">
                Notes
                <br>
                <input class="" type="text" placeholder="Search keywords" v-model="searchWord" @keyup="searchKeyword">
             </div>
          
            <!-- <div class="note-div">
                 <strong>Category Id</strong><br><br>
                 <div class="hehe">Toinks</div>
            </div> -->

            <div class="note-outer" v-for="(note,index) in notes" :key="index">
              <div style="padding: 5px">
                <h5> {{ categoryFilter(note.category_id)  }} - {{ note.label }} </h5>
              </div>
              <pre class=" card-body note-inner">{{ note.description }}</pre>
            </div>
          </div>
        </div>
    </div>
  </section>
</div>
</template>

<style>
  .note-outer {
    border: 2px solid #e6e2e2;
    padding: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-bottom: 40px;
  }

  .note-inner {
    background-color: lavender
  }


</style>

<script>
export default {
  name: 'notes',
  data () {
    return {
      notes : [],
      notesBackup : [],
      note : {
        category_id: null,
        description: null,
        label: null
      },
      categories : [
        {id: 1, name: 'Vue'},
        {id: 2, name: 'Laravel'},
        {id: 3, name: 'Javascript'},
        {id: 4, name: 'Nginx'},
        {id: 5, name: 'Mysql'},
        {id: 6, name: 'Linux'},
      ],
      searchWord: null
    }
  },
  mounted() {
    this.fetchNotes();
  },
  methods: {
    fetchNotes() {
      window.axios.get('/admin/notes')
        .then((response) => {
          this.notes = response.data
          this.notesBackup = response.data
        })
        .catch(error => {
          console.log(error.statusText)
        })
    },
    saveNote(e) {
      window.axios.post('/admin/notes/create', $(e.target).serialize())
        .then((response) => {
          this.notes.unshift ({
            category_id: this.note.category_id,
            description: this.note.description,
            label: this.note.label.charAt(0).toUpperCase() + this.note.label.slice(1),
            user_id: null 
          })
          this.resetFields();
        })
        .catch(error => {
          console.log(error.statusText)
        })
    },
    resetFields(){
         this.note.category_id = null;
         this.note.description = null;
         this.note.label = null;
    },

    categoryFilter(id) {
      for(let i in this.categories) {
        if(this.categories[i]['id']==id) {
          return this.categories[i]['name']
        }
      }
      return 'Unknown'
    },

    searchKeyword() {
      
       if(this.searchWord.length < 1) {
         this.notes = this.notesBackup
         return true;
       }

        this.getResult('label', this.searchWord.charAt(0).toUpperCase() + this.searchWord.slice(1))
    },

    getResult(keyToFilter, valueStartsWith) {
      let result =  _.filter(this.notes, (d) => { return d[keyToFilter].startsWith(valueStartsWith); })

      if(result.length > 0) {
        this.notes = result
      } 
    }
  },
  filters: {
      // categoryFilter(id) {
      //   return id
      // }
  }
}
</script>
