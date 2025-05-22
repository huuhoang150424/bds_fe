import BannerForm from '../components/banner-form'

export default function CreateBanner() {
  return (
    <div className=" ">
      <div className="mb-6">
        <h1 className="text-xl font-[600] text-gray-700  tracking-tight">Tạo mới Banner</h1>
        <p className="text-muted-foreground text-xs">Tạo mới 1 banner</p>
      </div>
      <BannerForm />
    </div>
  )
}
