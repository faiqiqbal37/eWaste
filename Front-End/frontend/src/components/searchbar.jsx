import { useState } from "react";

const Searchbar = ({ userList, updateUserList }) => {

    const [searchVal, setSearchVal] = useState("")

    

    const updateList = (e)=>{
        setSearchVal(searchVal => e.target.value);

        const searchValue = e.target.value.toLowerCase(); 
        
        const filteredList = userList.filter(user => {
            const lowerCaseName = user.name.toLowerCase();
            const lowerCaseEmail = user.email.toLowerCase();
            const lowerCaseContact = user.contact.toLowerCase();
        
            return lowerCaseName.includes(searchValue) || lowerCaseEmail.includes(searchValue) || lowerCaseContact.includes(searchValue);
        });
        
        updateUserList(filteredList);
        
    }

  return (
    <label className="input input-bordered flex items-center gap-2" >
      <input type="text" className="grow" placeholder="Search" value={searchVal} onChange={updateList} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
};

export default Searchbar;
