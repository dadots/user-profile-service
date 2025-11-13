/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import FormWrapper from "@/components/FormWrapper";
import { toast } from "react-toastify";
import { getProfile, updateProfile } from "@/services/profile";
import { Link } from "react-router-dom"

const Profile = () => {
    const [values, setValues] = useState({
        name: "",
        bio: "",
        email: ""
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setValues({
                    name: response.name,
                    bio: response.bio || "",
                    email: response.email
                });

            } catch (error) {
                console.error("Error fetching profile:", error);
                toast("Failed to load profile", { type: "error" });
            }
        };
        fetchProfile();
    }, [token]);

    const handleSave = async (e:any) => {
        e.preventDefault();
        const { email, name, bio } = values;
        try {
            await updateProfile({ name, email, bio });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast("Failed to update profile", { type: "error" });
        }
    };

    return (
        <FormWrapper title="Your Profile" bgGradient="from-purple-100 to-purple-300">
            <div className="space-y-4">
                <Input
                    label="Name"
                    type="text"
                    placeholder="Enter Name"
                    value={values?.name}
                    variant="purple"
                    onChange={e => setValues({...values, name: e.target.value})}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter Email"
                    value={values?.email}
                    variant="purple"
                    onChange={e => setValues({...values, email: e.target.value})}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                        className="w-full p-3 border bg-white text-gray-700 rounded-lg textarea textarea-secondary"
                        rows={3}
                        value={values?.bio}
                        onChange={e => setValues({...values, bio: e.target.value})}
                    />
                </div>

                <button
                    className="w-full btn btn-secondary"
                    onClick={handleSave}
                >
                    Save Changes
                </button>

                <button
                    className="w-full btn btn-error text-white py-3"
                >
                    <Link to="/" className="w-full block text-center">
                        Back to Home
                    </Link>
                </button>

            </div>
        </FormWrapper>
    );
};

export default Profile;