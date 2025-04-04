// Permissons
const tablePermissions = document.querySelector("[table-permissions]");
// console.log(tablePermissions);
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  //   console.log(buttonSubmit);
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    // console.log(rows);
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      //   console.log(name);
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          //   console.log(">>>check id: ", id);
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          //   console.log(">>>check index: ", index);
          //   console.log(">>>check name: ", name);
          //   console.log(">>>check checked: ", checked);
          //   console.log("-------------");
          if (checked) {
            permissions[index].permissions.push(name);
          }
        });
      }
    });
    console.log(">>>check permissions: ", permissions);

    if (permissions.length > 0) {
      const formChange_Permissions = document.querySelector(
        "#form-change-permissions"
      );
      //   console.log(formChange_Permissions);
      const input_Permissions = document.querySelector(
        "input[name='permissions']"
      );
      //   console.log(input_Permissions);
      input_Permissions.value = JSON.stringify(permissions);
      console.log((input_Permissions.value = JSON.stringify(permissions)));
      formChange_Permissions.submit();
    }
  });
}
// End Permissons

// Permissions data default
const data_Records = document.querySelector("[data-records]");
// console.log("check: ", data_Records);
if (data_Records) {
  const records = JSON.parse(data_Records.getAttribute("data-records"));
  console.log(records);
  const tablePermissions = document.querySelector("[table-permissions]");

  records.forEach((record, index) => {
    const permissions = record.permissions;
    // console.log(">>check permissions: ", permissions);

    permissions.forEach((permission) => {
      const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
      const input = row.querySelectorAll("input")[index];

      input.checked = true;
    });
  });
}
// End Permissions data default
