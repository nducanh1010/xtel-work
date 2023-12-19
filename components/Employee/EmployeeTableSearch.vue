<template>
  <div>
    <v-form>
      <v-row>
        <v-col cols="12" class="text-left">
          <div class="text-h6 text-uppercase primary--text">
            danh sách nhân sự
          </div>
          <div>
            Tổng số:
            <span class="red--text font-weight-bold">{{ employeesCount }}</span>
          </div>
        </v-col>
      </v-row>
      <v-row dense justify="end">
        <v-col class="d-flex" cols="12" lg="2">
          <v-text-field dense label="Họ tên" outlined />
        </v-col>
        <v-col cols="12" lg="2">
          <v-select dense label="Bộ phận" outlined />
        </v-col>
        <v-col dense cols="12" lg="2">
          <v-select dense label="Vị trí công tác" outlined />
        </v-col>
        <v-col cols="12" lg="2">
          <v-select dense label="Chức vụ" outlined />
        </v-col>
        <v-col cols="12" lg="2">
          <v-select dense label="Chức danh" outlined />
        </v-col>
        <v-col
          cols="12"
          lg="3"
          class="d-flex align-start justify-end flex-wrap"
        >
          <v-select
            dense
            label="Trạng thái làm việc"
            outlined
            value="abc"
            :clearable="true"
          />
        </v-col>
        <v-col
          cols="12"
          lg="auto"
          style="gap: 0.5rem"
          class="d-flex align-start justify-center justify-lg-end flex-wrap pr-2"
        >
          <v-spacer />
          <v-icon color="primary" class="mt-2">
            mdi-reload
          </v-icon>
          <v-btn elevation="2" color="primary">
            Tìm kiếm
          </v-btn>
          <v-btn elevation="2" color="success">
            <v-icon left dark>
              mdi-file-arrow-up-down
            </v-icon>
            Xuất file
          </v-btn>
          <v-btn elevation="2" color="primary" @click="handleAdd">
            Thêm
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <employee-dialog
      mode="add"
      :is-dialog-add-open="isDialogAddOpen"
      @close="handleClose"
    />
  </div>
</template>
<script>
export default {
  name: 'EmployeeTableSearch',
  components: {},
  data () {
    return {
      employeesCount: 294,
      requestParams: {
        name: '',
        jobDepartment: '',
        workPlace: '',
        jobPosition: '',
        jobTitle: '',
        status: true
      },
      isDialogAddOpen: false
    }
  },
  methods: {
    handleAdd () {
      this.isDialogAddOpen = true
    },
    handleClose () {
      this.isDialogAddOpen = false
    }
  }
}
</script>
