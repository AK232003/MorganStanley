import { React, useRef, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Dropdown,DropdownItem,DropdownMenu, DropdownToggle,Form,Input, FormGroup,Label,Button} from "reactstrap";
import { database, db, auth, storage } from "../../firebase";
import { getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const AddUser = ({ user, id }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const name = useRef();
  const phoneno = useRef();
  const uid = useRef();
  const image = useRef();
  const [imageUpload, setImageUpload] = useState(null);
  const utype = useRef();
  const [type, setType] = useState("");
  const [open, setOpen] = useState(1);
  const { signup, deleteUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userList, setList] = useState();
  const [idToDelete, setID] = useState(null);
  const [nameToDelete, setname] = useState(null);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== "Admin") navigate("/");
    db.collection("Users")
      .get()
      .then((d) => {
        let docs = d.docs;
        docs = docs.map((d) => d.data());
        setList(docs);
      });
  }, [user]);

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("Deleting user");
    deleteUser(uid.current.value);
  };
  const getManagerList = (event) => {
    const usersRef = db.collection("Users");

    usersRef
      .doc("admin")
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const managersList = data.ManagersList;

          console.log(managersList);
        } else {
          console.log("Users document 'admin' does not exist.");
        }
      })
      .catch((error) => {
        console.log("Error getting Users document:", error);
      });
  };

  async function createUser(event) {
    event.preventDefault();
    console.log("here");
    const id = uid.current.value.split("/").join("");
    const imagePath = storageRef(storage, `user/${id}`);
    uploadBytes(imagePath, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log(
          emailRef.current.value,
          passwordRef.current.value,
          type,
          uid.current.value,
          phoneno.current.value,
          name.current.value,
          url
        );
        await signup(
          emailRef.current.value,
          passwordRef.current.value,
          type,
          uid.current.value,
          phoneno.current.value,
          name.current.value,
          url
        );
      });
    });
  }

  // --------------------
  return (
    <>
      <div className="container overflow-auto rounded-2 max-w-lg justify-content-center">
        <div className="flex flex-row justify-content-between mt-4">
          <div className="w-auto">
          <button className="w-30 text-white bg-buttonColor/[0.7] rounded-2 p-2" onClick={() => setOpen(1)}>
            {t('Add User')}
          </button>
          </div>
          <div className="w-auto">
          <button className="w-30 text-white bg-buttonColor/[0.7] rounded-2 p-2" onClick={() => setOpen(2)}>
            {t('Delete User')}
          </button>
          </div>
        </div>
        <hr className="border-solid h-px m-1"></hr>
        <div className="flex w-full justify-content-center">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          {open === 1 && (
            <form
              className="d-flex flex-column overflow-y-auto bg-color3 rounded-2 shadow-md p-3"
              onSubmit={(e) => createUser(e)}
            >
              <div className="form-outline mb-2">
                <label className="form-label"> {t('Name')} </label>
                <input
                  type="text"
                  id="name"
                  className="form-control form-control-lg"
                  ref={name}
                  required
                />
              </div>
              <div className="form-outline mb-2">
                <label className="form-label"> {t('Email')} </label>
                <input
                  type="text"
                  id="email"
                  className="form-control form-control-lg"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="form-outline mb-2">
                <label className="form-label"> {t('Password')} </label>
                <input
                  type="text"
                  id="pass"
                  className="form-control form-control-lg"
                  ref={passwordRef}
                  required
                />
              </div>
              <div className="form-outline mb-2">
                <label className="form-label"> {t('Phone Number')} </label>
                <input
                  type="text"
                  id="phone"
                  className="form-control form-control-lg"
                  ref={phoneno}
                  required
                />
              </div>
              <div className="form-outline mb-2">
                <label className="form-label"> {t('User ID')} </label>
                <input
                  type="text"
                  id="uid"
                  className="form-control form-control-lg"
                  ref={uid}
                  required
                />
              </div>
              <div className="form-outline mb-2">
                <label className="form-label" for="photo">
                  {" "}
                  {t('Photo')}
                </label>
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  ref={image}
                  accept="image/*"
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label"> {t('User Type')} </label>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  direction="down"
                  ref={utype}
                  onChange={(event) => console.log(event)}
                >
                  <DropdownToggle
                    size="sm"
                    className="rounded-md w-full h-auto !text-textcolor text-base p-2 border-0 bg-white shadow-md"
                    caret
                  >
                    {type === "" ? t('Select User Type') : type}
                  </DropdownToggle>
                  <DropdownMenu className="text-textcolor">
                    <DropdownItem onClick={() => setType("Admin")}>
                      Admin
                    </DropdownItem>
                    <DropdownItem onClick={() => setType("CaseManager")}>
                      CaseManager
                    </DropdownItem>
                    <DropdownItem onClick={() => setType("GroundWorker")}>
                      GroundWorker
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="flex flex-col justify-content-center md:flex-row mb-4 bg-color5 rounded-2">
                <button disabled={loading} className="w-30 m-1" type="submit">
                  {t('Create User')}
                </button>
              </div>
            </form>
          )}
          {open === 2 && (
            <Form
              className="h-96 m-2"
              onSubmit={(event) => getManagerList(event)}
            >
              <FormGroup>
                <Label for="wid"> {t('Select User ID/Name')} </Label>
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  direction="down"
                  ref={utype}
                  onChange={(event) => console.log(event)}
                >
                  <DropdownToggle
                    size="sm"
                    className="rounded-md w-full h-auto !text-textcolor text-base p-2 border-0 bg-white shadow-md"
                    caret
                  >
                    {idToDelete === null
                      ? t('Select User')
                      : idToDelete + " " + nameToDelete}
                  </DropdownToggle>
                  <DropdownMenu className="text-textcolor">
                    {userList !== undefined &&
                      userList.map((user) => {
                        if (user["UserID"] !== "admin")
                          return (
                            <DropdownItem
                              key={user["UserID"]}
                              onClick={() => {
                                setID(user["UserID"]);
                                setname(user["Name"]);
                              }}
                            >
                              {t('User ID')}: {user["UserID"]} --- {t('Name')}: {user["Name"]}
                            </DropdownItem>
                          );
                      })}
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
              <FormGroup row>
                <div className="col-2">
                  <Button type="submit" color="primary">
                    {t('Delete')}
                  </Button>
                </div>
              </FormGroup>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};

export default AddUser;
