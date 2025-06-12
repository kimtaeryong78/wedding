export default function RSVP() {
  return (
    <section className="py-16 px-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">참석 여부 알려주세요</h2>
      <p className="mb-4">아래 버튼을 눌러 구글폼으로 이동해주세요.</p>
      <a
        href="https://docs.google.com/forms/test" // ← 구글폼 링크 넣기
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
      >
        RSVP 하기
      </a>
    </section>
  );
}
