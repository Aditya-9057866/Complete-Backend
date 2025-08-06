let users = [
  { id: 1, name: "adi", email: "apsr@gmail.com" },
  { id: 2, name: "paru", email: "pv@gmail.com" }
];
// get all users
exports.getUsers = (req, res) => {
  res.status(200).json({ users, message: "users get succesfully" })
}
exports.getUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    res.status(500).json({message:"user not found",success:false})
  }
  res.status(200).json({message:"user get successfully",success:true,user})
}

exports.createUser=(req, res)=> {
  const { name, email } = req.body
  const newUser = { id:users.length+1, name, email }
  users.push(newUser);
  res.status(200).json({message:"user created successfully",success:true,newUser})
}

exports.updateUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id)
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
    res.status(200).json({message:"user updated successfully",success:true,user})
}

exports.deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id)
  const { name, email } = req.body;
  if (!user) {
         res.status(500).json({message:"user not found",success:false})
  }
    users=users.filter(u=>u.id!=id)
    res.status(200).json({message:"user deleted successfully",success:true,users})
}