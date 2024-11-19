"use client"
import { useEffect, useState } from "react"

function ChildProfileDetails({ id, data }) {
    const [loading, setLoading] = useState(true);
    /*   const [data, setData] = useState(null);
      useEffect(() => {
          const fetchUser = async () => {
              const token = JSON.parse(localStorage.getItem("userData"))?.token;
              const url = `https://academiq.onrender.com/users/${id}`;
              try {
                  const response = await fetch(url, {
                      method: "GET",
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`
                      },
                  });
  
                  if (!response.ok) {
                      const errorData = await response.json();
                      console.error("Error Data:", errorData);
                      throw new Error(errorData.error || "Unknown error");
                  }
                  const result = await response.json();
                  setData(result)
                  setLoading(false)
  
              } catch (error) {
                  console.error("Error getting user data", error);
                  throw error;
              } finally {
                  setLoading(false)
              }
          }
          fetchUser()
  
      }, [id]) */
    /* useEffect(() => {
        if (data) {
            setLoading(false); // Set loading to false when data is available
        }
    }, [data]);
    if (loading) {
        return <div className="items-center flex flex-col min-h-[40vh]
         md:min-h-[60vh] md:max-h-[100vh] mb-4
        mt-3 mx-auto w-[90%]">
            <div className="mt-3 flex justify-center items-center h-full">
                <div className="flex items-center justify-center ">
                    <div className="w-8 h-8 rounded-full animate-spin border 
        border-solid border-cyan-500 border-t-transparent"></div>
                </div>
            </div>
        </div >
    } */
    if (!data) {
        return <div className="items-center flex flex-col min-h-[40vh]
         md:min-h-[60vh] md:max-h-[100vh] mb-4
        mt-3 mx-auto w-[90%] font-poppins">No user data found</div>;
    }
    const {
        user: { name: { first, last },
            email,
            ssn,
            birthdate,
            gender,
            role,
            userId,
            username,
            parents: {
                father: {
                    email: fatherEmail
                }
            },
            gradeClass: {
                level,
                letter,
                room
            },
            contactInformation: {
                address: {
                    street,
                    city,
                    state
                },
            },
        } } = data
    const fullName = `${first} ${last}`;

    return (
        <div className="flex flex-col">
            <Details title={'Name:'} info={fullName} />
            <Details title={'Role:'} info={role} />
            <Details title={'Email:'} info={email} />
            <Details title={'Username:'} info={username} />
            <Details title={'User Id:'} info={userId} />
            <Details title={'Class:'} info={letter + '' + level} />
            <Details title={'Class Location:'} info={room} />
            <Details title={'Birthdate:'} info={birthdate} />
            <Details title={'Gender:'} info={gender} />
            <Details title={'SSN:'} info={ssn} />
            <Details title={'Father:'} info={fatherEmail} />
            {<Details title={'Address:'} info={street + ',' + state + ',' + city} />
            }        </div>
    )
}

export default ChildProfileDetails

function Details({ title, info }) {
    return <div>
        <div className="flex justify-start space-x-4 items-center">
            <p className="font-poppins text-gray-600 text-[12px]">{title}</p>
            <p className="font-poppins text-gray-600">{info}</p>
        </div>
        <hr className="w-full h-0.5  my-2 bg-gray-100" />
    </div>
}
/*

*/
