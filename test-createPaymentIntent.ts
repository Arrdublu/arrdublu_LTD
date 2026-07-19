import { createPaymentIntent } from './src/lib/actions';

async function run() {
  try {
    const res = await createPaymentIntent([{
      service: {
        id: "test",
        name: "test",
        description: "test",
        price: 100,
        category: "Creative",
        image: "",
        previews: []
      },
      quantity: 1
    }], "USD");
    console.log("Success:", res);
  } catch (err) {
    console.error("Failed:", err);
  }
  process.exit(0);
}

run();
