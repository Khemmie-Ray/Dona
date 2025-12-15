import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateProfile from "@/hooks/useCreateProfile";
import { useState } from "react";
import type { BaseError } from "wagmi";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [socials, setSocials] = useState("");

  const { createProfile, isPending, isConfirming, isLoading, hash, error } =
    useCreateProfile({
      onSuccess: () => {setUsername(""), setSocials("")},
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProfile(username, socials);
  };

  const getButtonText = () => {
    if (isPending) return "Confirm in wallet...";
    if (isConfirming) return "Creating jar...";
    return "Create Profile";
  };

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#FFCB39] hover:text-white py-4 px-6 w-full lg:w-[40%] md:w-[40%] rounded-lg text-[#0E1D20] font-medium">
            Get Started
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:w-[30%] md:w-[40%] w-full ">
      <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="my-6">Create Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="Stephen"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="handle">Social handle (Preferred one)</Label>
              <Input
                id="handle"
                name="socialHandle"
                placeholder="X/LinkedIn/Tiktok/Instagram"
                value={socials}
                onChange={(e) => setSocials(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-[#FFCB39] text-[#0E1D20] hover:text-white my-6"
            >
              {getButtonText()}
            </Button>
          </DialogFooter>
      </form>
        </DialogContent>
    </Dialog>
  );
};

export default Profile;
