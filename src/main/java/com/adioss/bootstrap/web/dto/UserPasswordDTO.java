package com.adioss.bootstrap.web.dto;

public class UserPasswordDTO {
    private String newPassword = "";
    private String newPasswordValidation = "";

    public UserPasswordDTO() {
    }

    public UserPasswordDTO(String newPassword, String newPasswordValidation) {
        this.newPassword = newPassword;
        this.newPasswordValidation = newPasswordValidation;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getNewPasswordValidation() {
        return newPasswordValidation;
    }

    public void setNewPasswordValidation(String newPasswordValidation) {
        this.newPasswordValidation = newPasswordValidation;
    }
}
