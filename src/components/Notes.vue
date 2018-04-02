<template>
  <div>
    <section class="notes">
    <div class="container">
        <div class="row">
          <div class="col-md-4 hidden-sm-down">
            <form @submit.prevent="saveNote">
              <div class="form-group">
                  <label for="category_id">Select Category</label>
                  <select name="category_id" class="form-control" v-model="note.category_id">
                    <option :value="category.name" v-for="category in categories" :disabled="!currentUser">{{ category.name }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="form_note">Label </label>
                  <input type="text" class="form-control" name="label"  required v-model="note.label" :disabled="!currentUser">
                </div>
                <div class="form-group">
                  <label for="form_note">Notes </label>
                  <textarea class="form-control" name="description" rows="15" required v-model="note.description"  :disabled="!currentUser"></textarea>
                </div>
                <div class="form-group">
                  <button class="btn btn-default" type="submit" :disabled="!currentUser">Save</button>
                </div>
            </form>
          </div>

          <div class="col-md-8 col-sm-12">
             <div class="form-group">
                <label>Notes: </label>
                <input id="tags" class="form-control" type="text" placeholder="Search keywords" v-model="searchWord" @keyup="searchKeyword">
             </div>
          
            <!-- <div class="note-div">
                 <strong>Category Id</strong><br><br>
                 <div class="hehe">Toinks</div>
            </div> -->

            <div class="note-outer" v-for="(note,index) in notes" :key="index">

              <div style="padding: 5px">
                <h5> {{ note.category_id }} - {{ note.label }} 
                  <span class="pull-right" v-if="currentUser">
                    <button @click="updateId=index" type="button" class="btn btn-sm btn-success" :disabled="updateId==index"><i class="fa fa-pencil"></i></button>
                    <button @click="deleteNote(index,note._id)" type="button" class="btn btn-sm btn-danger" :disabled="updateId==index"><i class="fa fa-times"></i></button>
                  </span>
                </h5>
                <div class="row">
                  <div class="col-md-5">
                    <input type="text" class="form-control" v-model="note.label" v-if="updateId==index" style="margin-left: -5px;">
                  </div>
                </div>
              </div>

              <pre v-if="updateId!=index" class=" card-body note-inner">{{ note.description }}</pre>
              <textarea v-if="updateId==index" class="form-control" v-model="note.description" rows="15"></textarea>

              <div v-if="updateId==index" class="text-center">
                <div style="margin-top: 10px;"></div>
                <button type="button" class="btn btn-warning" @click="updateId=null">Cancel</button>
                <button type="button" class="btn btn-primary" @click="updateNotes(index)">Update</button>
              </div>

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
    background-color: #e6e6fa;
    width: 100%;
    margin-top: 5px;
    border-radius: 4px;
  }

  .text-center {
   text-align: center;
  }

</style>

<script>

import { mapGetters } from 'vuex'

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
      updateId: null,
      categories : [
        {id: 1, name: 'Vue'},
        {id: 2, name: 'Laravel'},
        {id: 3, name: 'Javascript'},
        {id: 4, name: 'Nginx'},
        {id: 5, name: 'Mysql'},
        {id: 6, name: 'Linux'},
        {id: 7, name: 'Node Express'},
        {id: 8, name: 'Php'},
        {id: 9, name: 'Git'}
      ],
      searchWord: null
    }
  },
  computed: {
     ...mapGetters({
      currentUser: 'getUser'
    })
  },
  mounted() {
    this.fetchNotes();
    this.autocomplete();
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
          // this.notes.unshift ({
          //   category_id: this.note.category_id,
          //   description: this.note.description,
          //   label: this.note.label.charAt(0).toUpperCase() + this.note.label.slice(1),
          //   user_id: null 
          // })
          this.notes.unshift (response.data.notes)
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

        // this.getResult('label', this.searchWord.charAt(0).toUpperCase() + this.searchWord.slice(1))
    },

    getResult(id) {
        window.axios.get('/admin/note/'+id)
        .then((response) => {
            this.notes = [];
            this.notes.push(response.data.note)
        })
        .catch(error => {
          console.log(error.statusText)
          alert("Something went wrong")
        })
    },

    updateNotes(index) {
       window.axios.patch('/admin/notes/update',this.notes[index])
       .then((response) => {
          this.notes[index] = response.data.notes
          alert("Successfully update")
          this.updateId = null
       })
        .catch(error => {
          console.log(error.statusText)
          alert("Something went wrong")
        })
    },

    deleteNote(index,id) {
       window.axios.post('/admin/notes/delete/', {id:id})
       .then((response) => {
         this.notes.splice(index,1)
         alert("Successfully deleted")
         this.updateId = null
       })
        .catch(error => {
          console.log(error.statusText)
          alert("Something went wrong")
        })
    },
    autocomplete(){

      let self = this;
      window.axios.get('/admin/notes/autocomplete')
       .then((response) => {
            console.log(self.searchKeyword);
            $( "#tags" ).autocomplete({
              source: response.data,
              select: function(event, ui) {
                self.notes = self.notesBackup
                self.searchWord = ui.item.label
                self.getResult(ui.item.value)
              },
              keyup: function(){
                console.log('test')
              }
            });
       })
        .catch(error => {
          console.log(error.statusText)
          alert("Something went wrong Autocomplete")
        })
    }
  },
  filters: {
      // categoryFilter(id) {
      //   return id
      // }
  }
}
</script>
