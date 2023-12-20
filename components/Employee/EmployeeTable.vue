<template>
  <v-row>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="data.result"
        :items-per-page="5"
        item-key="da"
        class="elevation-1"
      >
        <template #[`item.index`]="{ index }">
          {{ ++index }}
        </template>
        <template #[`item.imgUrl`]="{ item }">
          <div class="pa-4">
            <v-img
              :src="item.imgUrl"
              class="mx-auto"
              alt=" user image"
              max-height="50"
              max-width="50"
              contain
            />
          </div>
        </template>
        <template #[`item.status`]="{ item }">
          <v-icon :color="handleStatus(item.status)" class="mr-2">
            {{ item.status === true ? "mdi-check-circle" : "mdi-close-circle" }}
          </v-icon>
        </template>
        <template #[`item.actions`]="{ item, index }">
          <v-icon small @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="
              deleteOpen = true;
              itemDeleteIndex = index;
            "
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <employee-dialog
        ref="EditDialog"
        mode="edit"
        :is-dialog-add-open="isDialogEditOpen"
        @close="handleCloseEdit"
      />
      <v-dialog width="400px" :value="deleteOpen">
        <v-card>
          <v-toolbar color="primary" dark>
            <strong>Xác nhận</strong>
            <v-spacer />
            <v-icon> mdi-window-close</v-icon>
          </v-toolbar>
          <v-card-text>
            <div class="pa-5 text-center">
              Bạn có chắc chắn xóa user này
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions class="justify-end">
            <v-container class="d-flex justify-end">
              <v-btn large color="accent" @click="deleteOpen = false">
                Hủy
              </v-btn>
              <v-btn
                large
                depressed
                color="primary"
                class="ml-2"
                @click="deleteItem"
              >
                Xác nhận
              </v-btn>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'EmployeeTable',

  data () {
    return {
      itemDeleteIndex: 0,
      deleteOpen: false,
      isDialogEditOpen: false,
      headers: [
        { text: 'STT', value: 'index', sortable: false },
        {
          text: 'Họ tên',
          align: 'center',
          value: 'name'
        },
        { text: 'Ảnh', align: 'center', value: 'imgUrl', sortable: false },
        {
          text: 'Tên ngắn',
          align: 'center',
          value: 'shortName',
          sortable: false
        },
        {
          text: 'Chức vụ',
          align: 'center',
          value: 'jobPosition',
          sortable: false
        },
        {
          text: 'Chức danh',
          align: 'center',
          value: 'jobTitle',
          sortable: false
        },
        {
          text: 'Bộ phận',
          align: 'center',
          value: 'jobDepartment',
          sortable: false
        },
        {
          text: 'Vị trí công tác',
          align: 'center',
          value: 'workPlace',
          sortable: false
        },
        { text: 'Trụ sở', align: 'center', value: 'address', sortable: false },
        {
          text: 'T.K Đăng nhập',
          align: 'center',
          value: 'username',
          sortable: false
        },
        {
          text: 'T.T Làm việc',
          align: 'center',
          value: 'status',
          sortable: false
        },
        { text: 'Actions', align: 'center', value: 'actions', sortable: false }
      ]
    }
  },

  computed: {
    ...mapState('employee', ['data'])
  },
  methods: {
    handleStatus (val) {
      if (val === true) {
        return 'success'
      }
      return 'error'
    },
    editItem (item) {
      this.isDialogEditOpen = !this.isDialogEditOpen
      this.$refs.EditDialog.$data.userParams = {
        ...this.$refs.EditDialog.$data.userParams,
        ...item
      }
    },
    deleteItem () {
      this.$store.commit('employee/delete', this.itemDeleteIndex)
      this.deleteOpen = false
    },
    handleCloseEdit () {
      this.isDialogEditOpen = false
    }
  }
}
</script>
