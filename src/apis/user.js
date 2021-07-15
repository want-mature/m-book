import http from "../../request/index.js"

// 上传头像
export const upLoadAvatar = (formData) => http.post("api/user/upLoadAvatar",{
    // phone:phone,
    formData:formData
})
