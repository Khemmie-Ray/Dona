import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoClose } from "react-icons/io5";

const Profile = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-[#FFCB39] hover:text-white py-4 px-6 w-full lg:w-[40%] md:w-[40%] rounded-lg text-[#0E1D20] font-medium">Get Started</Button>
        </DialogTrigger>
        <DialogContent className="lg:w-[30%] md:w-[40%] w-full ">
          <DialogHeader>
            <DialogTitle className="my-6">Create Profile</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" placeholder="Stephen" />
            </div>
                <div className="grid gap-3">
              <Label htmlFor="handle">Social handle (Preferred one)</Label>
              <Input id="handle" name="socialHandle" placeholder="X/LinkedIn/Tiktok/Instagram"/>
            </div>
          </div>
          <DialogFooter>
           
            <Button type="submit" className="w-full bg-[#FFCB39] text-[#0E1D20] hover:text-white">Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default Profile;