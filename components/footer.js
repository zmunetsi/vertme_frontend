// footer 

export default function Footer() {
    return (
        <footer className="footer fixed bottom-0 left-0 w-full">
            <div className="text-center p-4">
            {/* copyright */}
          &copy; {new Date().getFullYear()} Vertme
            </div>
        </footer>
    );
}
