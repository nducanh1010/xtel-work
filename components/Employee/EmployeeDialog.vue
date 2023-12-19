<template>
  <v-row>
    <v-col cols="12" lg="6">
      <v-dialog
        :width="$vuetify.breakpoint.mobile ? '100%' : ' 70%'"
        :value="isDialogAddOpen"
        scrollable
        persistent
      >
        <v-card>
          <v-card-title class="font-weight-medium">
            <span class="text-h5">{{ mode === "add" ? "Thêm mới" : "Cập nhật" }} người dùng</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-sheet outlined color="grey lighten-3" class="py-1 pl-6">
                <span class="primary--text font-weight-black">Thông tin tài khoản</span>
              </v-sheet>
              <v-container fluid>
                <v-row>
                  <v-col cols="12" lg="6">
                    <div class="mb-2">
                      <strong>Địa chỉ thư điện tử @mic.gov.vn</strong>
                      <v-icon color="success">
                        mdi-information
                      </v-icon>
                    </div>
                    <v-text-field
                      :rules="[rules.required, rules.email]"
                      background-color="grey lighten-2"
                      solo
                      flat
                      color="transparent"
                      hide-details="auto"
                      :persistent-placeholder="true"
                      placeholder="Nhập Email"
                    >
                      <template #prepend-inner>
                        <v-icon> mdi-email</v-icon>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col v-if="mode === 'add'" cols="12" lg="6">
                    <div class="mb-2">
                      <strong>Mật khẩu</strong>
                    </div>
                    <v-text-field
                      ref="password"
                      v-model="userParams.password"
                      autocomplete="new-password"
                      background-color="grey lighten-2"
                      solo
                      flat
                      autofocus
                      :persistent-placeholder="true"
                      placeholder="Nhập mật khẩu"
                      hide-details="auto"
                      :type="isShowPassword ? 'text' : 'password'"
                    >
                      <template #prepend-inner>
                        <v-icon> mdi-lock</v-icon>
                      </template>
                      <template #append>
                        <v-icon @click="isShowPassword = !isShowPassword">
                          {{ isShowPassword ? "mdi-eye" : "mdi-eye-off" }}
                        </v-icon>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <div class="mb-2">
                      <strong>Người dùng</strong>
                      <v-icon color="success">
                        mdi-information
                      </v-icon>
                    </div>

                    <v-text-field
                      v-model="userParams.username"
                      autocomplete="new-username"
                      :disabled="mode === 'edit'"
                      background-color="grey lighten-2"
                      solo
                      flat
                      hide-details="auto"
                      placeholder="Nhập người dùng"
                    >
                      <template #prepend-inner>
                        <v-icon> mdi-account</v-icon>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col v-if="mode === 'add'" cols="12" lg="6">
                    <div class="mb-2">
                      <strong> Nhập lại Mật khẩu</strong>
                    </div>

                    <v-text-field
                      v-model="userParams.confirmPassword"
                      background-color="grey lighten-2"
                      solo
                      flat
                      :rules="[rules.required, rules.compareString]"
                      :persistent-placeholder="true"
                      placeholder="Nhập lại mật khẩu"
                      hide-details="auto"
                      :type="reEnterPassword ? 'text' : 'password'"
                    >
                      <template #prepend-inner>
                        <v-icon> mdi-lock</v-icon>
                      </template>
                      <template #append>
                        <v-icon @click="reEnterPassword = !reEnterPassword">
                          {{ reEnterPassword ? "mdi-eye" : "mdi-eye-off" }}
                        </v-icon>
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="d-flex">
                    <v-switch class="mr-4" label="Trạng thái duyệt" />
                    <v-switch label="Trạng thái kích hoạt" />
                  </v-col>
                </v-row>
              </v-container>

              <v-row />
              <v-sheet outlined class="grey lighten-3 py-1 pl-6">
                <span class="primary--text font-weight-black">
                  Thông tin cá nhân</span>
              </v-sheet>
              <v-container fluid>
                <v-row>
                  <v-file-input
                    ref="inputProfile"
                    v-model="imageInput"
                    flat
                    style="display: none"
                    @change="handlePreview"
                  />
                  <v-col
                    cols="12"
                    sm="4"
                    lg="4"
                    class="d-flex justify-center align-center"
                  >
                    <div class="d-flex flex-column primary--text">
                      <v-icon
                        v-if="!userParams.imgUrl"
                        color="primary"
                        size="90"
                        @click="handleUpload"
                      >
                        mdi-cloud-upload
                      </v-icon>
                      <div
                        v-if="!userParams.imgUrl"
                        class="text-uppercase font-weight-bold text-center"
                      >
                        Chọn ảnh đại diện
                      </div>
                    </div>

                    <div class="d-flex justify-center">
                      <v-fade-transition>
                        <v-img
                          v-if="userParams.imgUrl"
                          v-model="userParams.imgUrl"
                          max-width="100"
                          contain
                          :src="userParams.imgUrl"
                        />
                      </v-fade-transition>
                      <v-icon
                        v-if="userParams.imgUrl"
                        class="align-self-start"
                        @click="handleRemove"
                      >
                        mdi-close-thick
                      </v-icon>
                    </div>
                  </v-col>

                  <!-- Section-->
                  <v-col cols="12" md="8" lg="8">
                    <v-row>
                      <v-col cols="12" lg="4">
                        <div class="mb-2">
                          <strong>Họ và tên</strong>
                        </div>
                        <v-text-field
                          v-model="userParams.name"
                          flat
                          dense
                          background-color="grey lighten-2"
                          solo
                          color="transparent"
                          hide-details="auto"
                          :persistent-placeholder="true"
                          placeholder=" Nhập họ và tên"
                        />
                      </v-col>
                      <v-col cols="6" lg="4">
                        <div class="mb-2">
                          <strong>Giới tính</strong>
                        </div>
                        <v-select
                          background-color="grey lighten-2"
                          dense
                          flat
                          hide-details="auto"
                          color="grey lighten-2"
                          :items="gender"
                          label="Giới tính"
                          solo
                        />
                      </v-col>
                      <v-col cols="12" md="6" lg="4">
                        <div class="mb-2">
                          <strong>Ngày sinh</strong>
                        </div>
                        <v-menu
                          ref="datePicker"
                          v-model="datePicker"
                          :close-on-content-click="false"
                          :return-value.sync="userParams.dateChoose"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="userParams.dateChoose"
                              background-color="grey lighten-2"
                              color="grey lighten-2"
                              readonly
                              hide-details="auto"
                              v-bind="attrs"
                              prepend-inner-icon="mdi-calendar"
                              solo
                              dense
                              flat
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="userParams.dateChoose"
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="datePicker = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="
                                $refs.datePicker.save(userParams.dateChoose)
                              "
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12">
                        <div>
                          <strong>Địa chỉ</strong>
                        </div>
                        <v-text-field
                          v-model="userParams.address"
                          flat
                          dense
                          background-color="grey lighten-2"
                          solo
                          color="transparent"
                          hide-details="auto"
                          :persistent-placeholder="true"
                          placeholder=" Nhập địa chỉ ."
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4">
                    <div class="mb-2">
                      <strong>Đơn vị công tác</strong>
                    </div>
                    <v-select
                      v-model="userParams.jobDepartment"
                      cache-items
                      flat
                      background-color="grey lighten-2"
                      dense
                      hide-details="auto"
                      color="grey lighten-2"
                      :items="departments"
                      label="Chọn đơn vị"
                      solo
                    />
                  </v-col>
                  <v-col cols="12" lg="4">
                    <div class="mb-2">
                      <strong>Chức vụ</strong>
                    </div>
                    <v-select
                      v-model="userParams.jobPosition"
                      cache-items
                      flat
                      background-color="grey lighten-2"
                      dense
                      hide-details="auto"
                      color="grey lighten-2"
                      :items="positions"
                      label="Chọn chức vụ"
                      solo
                    />
                  </v-col>
                  <v-col cols="12" lg="4">
                    <div class="mb-2">
                      <strong>Chức danh</strong>
                    </div>
                    <v-select
                      v-model="userParams.jobTitle"
                      cache-items
                      flat
                      background-color="grey lighten-2"
                      dense
                      hide-details="auto"
                      color="grey lighten-2"
                      :items="title"
                      label="Chọn chức danh"
                      solo
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="4">
                    <div class="mb-2">
                      <strong>Điện thoại di động</strong>
                    </div>
                    <v-text-field
                      :rules="[rules.phone]"
                      dense
                      background-color="grey lighten-2"
                      solo
                      class="mb-2"
                      color="transparent"
                      flat
                      hide-details="auto"
                      :persistent-placeholder="true"
                      placeholder=" Nhập SĐT di động"
                    />
                    <div class="mb-2">
                      <strong>Điện thoại cơ quan</strong>
                    </div>
                    <v-text-field
                      dense
                      background-color="grey lighten-2"
                      solo
                      color="transparent"
                      flat
                      hide-details="auto"
                      :persistent-placeholder="true"
                      placeholder=" Nhập SĐT cơ quan"
                    />
                  </v-col>
                  <v-col cols="12" lg="8">
                    <div class="mb-2">
                      <strong>Thông tin thêm</strong>
                    </div>
                    <v-textarea
                      dense
                      solo
                      flat
                      background-color="grey lighten-2"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-container class="d-flex justify-end">
              <v-btn large color="accent" @click="handleClose">
                Đóng
              </v-btn>
              <v-btn
                large
                depressed
                color="primary"
                class="ml-2"
                @click="handleAdd"
              >
                {{ mode === "add" ? "Thêm" : "Cập nhật" }}
              </v-btn>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'EmployeeDialog',
  props: {
    isDialogAddOpen: {
      type: Boolean,
      default: () => false
    },
    mode: {
      type: String,
      default: () => 'add'
    }
  },
  data () {
    return {
      userParams: {
        dateChoose: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        password: '',
        confirmPassword: '',
        name: '  ',
        imgUrl: '',
        age: null,
        shortName: '',
        gender: '',
        jobPosition: '',
        jobTitle: '',
        jobDepartment: '',
        workPlace: '',
        address: ' ',
        username: '',
        status: false,
        email: ''
      },
      title: [
        'Senior Project Manager',
        'Lead Designer',
        'Creative Director',
        'Marketing Manager',
        'Finance Manager'
      ],
      positions: [
        'Sales Representative',
        'Data Scientist',
        'Operations Manager',
        'Financial Advisor',
        'Product Manager',
        'Human Resources Manager'
      ],
      departments: [
        'Data Science',
        'Human Resources',
        'Product Management',
        'Financial Consultant',
        'Operations'
      ],
      datePicker: false,
      imageInput: null,

      isShowPassword: false,
      reEnterPassword: false,
      gender: ['male', 'female'],
      valid: true,
      rules: {
        required: this.$validate.required,
        email: this.$validate.email,
        phone: this.$validate.phone,
        compareString: (value) => {
          return value === this.userParams.password
            ? true
            : 'The password confirmation does not match.'
        }
      }
    }
  },
  computed: {},

  methods: {
    handleUpload () {
      this.$refs.inputProfile.$refs.input.click()
    },
    handlePreview () {
      if (this.imageInput) {
        this.userParams.imgUrl = URL.createObjectURL(this.imageInput)
      }
    },
    handleRemove () {
      // xóa URL khỏi bộ nhớ
      this.userParams.imgUrl = ''
      this.imageInput = null
    },
    handleClose () {
      this.$emit('close')
    },
    async handleAdd () {
      if (this.mode === 'add') {
        this.$refs.form.validate() &&
          (await this.$store.commit('employee/add', this.userParams)) &&
          this.handleClose()

        return
      }
      // case edit
      this.$store.commit('employee/update', this.userParams)
      this.handleClose()
    }
  }
}
</script>

<style scoped></style>
