import { LockKeyhole } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function VIPRequired() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md text-center border border-gray-200 rounded-[10px]">
        <CardHeader>
          <div className="mx-auto bg-[#fff]  rounded-full w-fit mb-2">
            <img src="https://media.tenor.com/9Ez46wr-voMAAAAC/lock.gif" alt="lock" />
          </div>
          <CardTitle className="text-2xl">Tính năng VIP</CardTitle>
          <CardDescription className="text-lg">Bạn phải có VIP để sử dụng chức năng này</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Vui lòng nâng cấp tài khoản của bạn để truy cập đầy đủ các tính năng.</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full bg-[#E03C31] hover:bg-[#FF837A]">Nâng cấp lên VIP</Button>
          <Button variant="outline" className="w-full">
           <Link to={'/overview'}> Quay lại</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

