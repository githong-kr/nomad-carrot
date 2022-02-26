import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className=" grid min-h-screen gap-10 bg-slate-400 py-20 px-20 lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center">
      <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-xl dark:bg-black">
        <span className="text-3xl font-semibold dark:text-white">
          Select Item
        </span>
        <ul>
          {[1, 2].map((index) => (
            <div
              key={index}
              className="my-2 flex justify-between even:bg-blue-50 dark:even:bg-gray-700"
            >
              <span className="text-gray-500 dark:text-gray-100 ">
                Grey Chair
              </span>
              <span className="font-semibold dark:text-white">$19</span>
            </div>
          ))}
        </ul>
        <div className="my-2 mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold">$103</span>
        </div>
        <div className="flex justify-center">
          <button className="mt-5 w-3/4 rounded-xl bg-blue-500 p-3 text-center text-white hover:bg-teal-500 hover:text-black active:bg-yellow-500 dark:border dark:border-white  dark:bg-black dark:hover:bg-white ">
            Checkout
          </button>
        </div>
      </div>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex justify-between p-6 pb-14 xl:pb-40 portrait:bg-green-500 landscape:bg-teal-500">
          <span className="text-2xl text-white">Profile</span>
          <span>cartIcon</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6 ">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-red-400 drop-shadow-2xl transition-colors group-hover:bg-green-400"></div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className="relative -mt-10 -mb-5 flex flex-col items-center">
            <span className="text-lg font-medium">Tony Molloy</span>
            <span className="text-sm text-gray-500">New York, USA</span>
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-xl lg:col-span-2 xl:col-span-1">
        {/* header */}
        <div className="mb-5 flex items-center justify-between">
          {/* arrow */}
          <span>←</span>
          {/* star & heart */}
          <div className="space-x-3">
            <span>⭐️ 4.9</span>
            <span className="rounded-md p-2 shadow-xl">❤️</span>
          </div>
        </div>
        {/* image */}
        <div className="mb-5 h-72 bg-zinc-300"></div>
        {/* product name */}
        <div className="flex flex-col">
          <span className="text-lg font-medium">Swoon Lounge</span>
          <span className="text-xs text-gray-500">Chair</span>
        </div>
        {/* input ring & quantity */}
        <div className="mt-3 mb-5 flex items-center justify-between">
          {/* input ring */}
          <div className="space-x-3">
            <button className="h-5 w-5 rounded-full bg-yellow-500 ring-yellow-500 ring-offset-2 transition focus:ring-2" />
            <button className="h-5 w-5 rounded-full bg-indigo-500 ring-indigo-500 ring-offset-2 transition focus:ring-2" />
            <button className="h-5 w-5 rounded-full bg-teal-500 ring-teal-500 ring-offset-2 transition focus:ring-2" />
          </div>
          {/* quantity */}
          <div className="flex items-center space-x-5">
            <button className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200 text-xl text-gray-500">
              -
            </button>
            <span>1</span>
            <button className="flex aspect-square w-8 items-center justify-center rounded-lg bg-blue-200 text-xl text-gray-500">
              +
            </button>
          </div>
        </div>
        {/* price & button */}
        <div className="flex items-center justify-between">
          <span className="text-3xl">$450</span>
          <button className="rounded-xl bg-blue-500 py-3 px-8 text-center text-xs text-white">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
