export function transformUser(data) {
  const profile = data._employee_profile;
  const role = profile._role;
  const office = role._office;

  return {
    id: data.id,
    username: data.username,
    _employee_profile: {
      id: profile.id,
      name: `${profile.last_name}, ${profile.first_name} ${
        profile.middle_name ? profile.middle_name.charAt(0) : ""
      }. ${profile.extension_name ? profile.extension_name : ""}`,
    },
    _office: {
      id: office.id,
      code: office.code,
      name: office.name,
      is_delivery_unit: office.is_delivery_unit,
      is_parent: office._children.length > 0,
    },
    _role: {
      id: role.id,
      name: role.role,
      is_head: office._head ? profile.id === office._head.id : false,
    },
    _level: data._level,
  };
}
