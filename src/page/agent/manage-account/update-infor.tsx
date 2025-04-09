"use client";

import { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
};

export default function AccountManagement() {
  const [activeTab, setActiveTab] = useState("edit-info");
  const [formData, setFormData] = useState<FormData>({
    fullName: "Mạnh Nguyễn Đức",
    email: "nguyenducmanh0228@gmail.com",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [avatar, setAvatar] = useState<string | null>(null); // State để lưu URL ảnh
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref để điều khiển input file

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  // Xử lý khi chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  // Kích hoạt input file khi nhấp vào "Tải ảnh"
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const validate = () =>
    ({
      email: !formData.email
        ? "Bắt buộc"
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Sai định dạng",
      phone: !formData.phone
        ? "Bắt buộc"
        : /^[0-9]{10}$/.test(formData.phone)
        ? ""
        : "Phải là 10 số",
    }) as Partial<FormData>;

  const handleSave = () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Dữ liệu hợp lệ:", { ...formData, avatar });
      alert("Đã lưu!");
    }
  };

  return (
    <div className="max-w-6xl my-16 p-8 mx-auto bg-white border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Quản lý tài khoản</h1>

      <Tabs defaultValue="edit-info" onValueChange={setActiveTab}>
        <TabsList className="w-full border-b mb-8 bg-white">
          <TabsTrigger
            value="edit-info"
            className="px-4 py-2 text-gray-700 text-xl rounded-none"
          >
            Chỉnh sửa thông tin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit-info" className="space-y-8">
          <div>
            <h2 className="text-lg font-medium mb-6">Thông tin cá nhân</h2>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div
                  className="w-24 h-24 rounded-full border flex items-center justify-center bg-gray-50 mb-2 cursor-pointer overflow-hidden"
                  onClick={handleAvatarClick}
                >
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <span
                  className="text-sm text-gray-500 hover:text-[#E03C31] cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  Tải ảnh
                </span>
              </div>
              <div className="flex-1">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 p-2"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-6">Thông tin liên hệ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel"
                  className="mt-1 p-2"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  className="mt-1 p-2"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              className="bg-[#E03C31] hover:bg-[#FF837A] text-white px-6 py-2"
            >
              Lưu thay đổi
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}