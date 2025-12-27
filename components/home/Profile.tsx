import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useCreateProfile from "@/hooks/useCreateProfile";
import { useState } from "react";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [socials, setSocials] = useState("");

  const { createProfile, isPending, isConfirming, isLoading } = useCreateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProfile(username, socials);

    setUsername("");
    setSocials("");
  };

  const getButtonText = () => {
    if (isPending) return "Confirm in wallet...";
    if (isConfirming) return "Creating Profile...";
    return "Create Profile";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#FFCB39] hover:text-white py-4 px-6 w-full lg:w-[40%] md:w-[40%] rounded-lg text-[#0E1D20] font-medium">
          Get Started
        </button>
      </DialogTrigger>
      <DialogContent className="lg:w-[30%] md:w-[40%] w-full border-0">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="my-6 t">Create Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <input
                id="username-1"
                name="username"
                placeholder="Stephen"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="p-3 rounded-lg mb-3 border-white/10 border"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="handle" className="mb-1">
                Social handle (Preferred one)
              </Label>
              <input
                id="handle"
                name="socialHandle"
                placeholder="X/LinkedIn/Tiktok/Instagram"
                value={socials}
                onChange={(e) => setSocials(e.target.value)}
                disabled={isLoading}
                className="p-3 rounded-lg mb-3 border-white/10 border"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="w-full bg-[#FFCB39] text-[#0E1D20] hover:text-white my-6 p-3 rounded-lg"
            >
              {getButtonText()}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
